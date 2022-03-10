FROM node:16

ENV TIME_ZONE=Europe/Paris

RUN echo $TIME_ZONE | tee /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /usr/app/api/

COPY ["./api/package.json", "./"]

# Install global dependencies
RUN npm install 

RUN npm audit fix

RUN npm install --only=dev

COPY ./ ./


