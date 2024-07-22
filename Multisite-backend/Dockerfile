FROM node:18

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the app
CMD ["npm", "start"]