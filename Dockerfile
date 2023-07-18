FROM nginx:alpine
COPY entrypoint.sh /etc/entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/national-portal-frontend-service/ /usr/share/nginx/html
COPY dist/portal-component/embed/ /usr/share/nginx/html/embed
WORKDIR /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["sh", "/etc/entrypoint.sh"]