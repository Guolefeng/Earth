FROM /nginx:1.13.12
RUN echo "Asia/shanghai" > /etc/timezone
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY  ./build /usr/share/nginx/html/web
EXPOSE 80