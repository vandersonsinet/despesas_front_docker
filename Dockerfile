FROM node


WORKDIR /usr/src/appDespesasFront


COPY package.json .


RUN npm install


COPY . .


CMD ["npm", "start"]


EXPOSE 3000