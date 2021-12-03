FROM node:16-alpine

# Create server directory
WORKDIR /usr/src/server

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy sorce code
COPY . .

EXPOSE 8081 

USER node

CMD [ "node", "index.js" ]