FROM python:3.8-slim-buster AS BASE

WORKDIR /facepaint

FROM BASE AS BUILD

RUN apt update && \
    apt install --yes --no-install-recommends python3-dev build-essential gcc
RUN pip install --upgrade pip
COPY requirements.txt /tmp/requirements.txt
RUN python3 -m pip install --prefix='/install' -r /tmp/requirements.txt
RUN python3 -m pip install --prefix='/install' uwsgi

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

COPY package.json .
RUN npm install --include=dev
COPY .babelrc webpack.config.js .env ./
COPY /src/ ./src/

RUN npm run build

FROM BASE

COPY --from=BUILD /facepaint/dist/ ./dist
COPY --from=BUILD /facepaint/src/server/  ./server
COPY --from=BUILD /install/ /usr/local
COPY ./deploy/uwsgi.conf.ini ./deploy/init_container.sh ./src/manage.py ./.env ./

EXPOSE 8000
CMD ["bash", "init_container.sh"]
