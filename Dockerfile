# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the app's port
EXPOSE 3001

# Command to run the app
CMD ["node", "dist/index.js"]