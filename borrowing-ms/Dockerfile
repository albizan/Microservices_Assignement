FROM node:16-alpine

# Create server directory
WORKDIR /usr/src/server

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production
RUN npm install rimraf

# Copy sorce code
COPY . .

RUN npm run build

EXPOSE 8083

USER node

CMD [ "node", "dist/index.js" ]