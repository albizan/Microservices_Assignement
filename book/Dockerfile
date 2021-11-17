from node:latest

# Create server directory
WORKDIR /usr/src/server

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy sorce code
COPY . .

EXPOSE 8081 

CMD [ "node", "server.js" ]