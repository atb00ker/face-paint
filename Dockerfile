FROM python:3.8-slim-buster AS BASE

WORKDIR /facepaint

FROM BASE AS BUILD

# get dependencies
RUN pip install --upgrade pip 
COPY requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
RUN apt-get install -y nodejs

COPY package.json .
RUN npm install --include=dev
COPY .babelrc webpack.config.js .env ./
COPY /src/ ./src/

# Build
RUN npm run build

FROM BASE

COPY --from=BUILD facepaint/dist/ ./dist

EXPOSE 8000


