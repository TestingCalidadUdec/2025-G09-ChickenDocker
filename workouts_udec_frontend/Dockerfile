FROM node:20-alpine
WORKDIR /workouts_udec_frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]