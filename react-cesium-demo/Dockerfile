FROM xxx
RUN echo "Asia/shanghai" > /etc/timezone
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY  ./build /usr/share/nginx/html/target
EXPOSE 80