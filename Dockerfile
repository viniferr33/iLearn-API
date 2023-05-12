# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the port on which your app will run
EXPOSE 8080

# Set the command to start your application
CMD [ "npm", "start" ]
