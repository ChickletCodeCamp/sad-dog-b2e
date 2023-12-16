# development image
FROM node:alpine AS development

# 建立app目錄
WORKDIR /usr/src/app

# 複製依賴檔
COPY  package*.json ./

COPY tsconfig*.json ./

# 下載 pnpm
RUN npm i -g pnpm

# 複製程式碼
COPY . . /usr/src/app/

# 下載依賴
RUN pnpm install -r

# 部屬專案
RUN pnpm run build

# production image
FROM node:alpine AS production

# 建立app目錄
WORKDIR /usr/src/app

# 複製依賴檔
COPY package.json ./

COPY pnpm-lock.yaml ./

# 下載 pnpm
RUN npm i -g pnpm

# 下載依賴(只下載需使用的依賴)
RUN pnpm install --prod

# 複製剛剛打包的檔案
COPY --from=development /usr/src/app/dist ./dist

# 啟動服務
CMD [ "node", "dist/main.js" ]