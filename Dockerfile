FROM debian:bullseye-slim

# amader mechine k update korbo and curl install korbo,node install korbo. curl er maddomei
RUN /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_22.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get upgrade -y && \
    /usr/bin/apt-get install -y nodejs ffmpeg

WORKDIR /home/app

RUN npm i -g nodemon

CMD nodemon index.js