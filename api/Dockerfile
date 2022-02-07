FROM node:16

ENV TIME_ZONE=Europe/Paris

RUN echo $TIME_ZONE | tee /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /usr/app

COPY ./ ./

# Install global dependencies
RUN npm install 

#CMD ["/bin/sh", "-c", "./start.sh"]

