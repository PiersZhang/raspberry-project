FROM node

# 指定工作目录为 /usr/src/app，接下来的命令全部在这个目录下操作
WORKDIR /usr/src/app

# VOLUME /var/log/server

# 将 package.json 拷贝到工作目录
COPY package.json /usr/src/app/

# 安装 npm 依赖
# RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
# RUN apt-get clean
RUN npm config set registry https://registry.npm.taobao.org && npm install

# 拷贝源代码
COPY . /usr/src/app/

# 设置环境变量（服务器的主机 IP 和端口）
# ENV MONGO_URI=mongodb://dream-db:27017/todos
# ENV HOST=0.0.0.0
# ENV PORT=4000
# ENV LOG_PATH=/var/log/server/access.log

# 开放 3000 端口
EXPOSE 5000

# 设置镜像运行命令
CMD [ "npm", "start" ]