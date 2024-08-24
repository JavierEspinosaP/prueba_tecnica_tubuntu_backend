# Use a Node.js base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Compile the TypeScript project (if necessary)
RUN pnpm run build

# Expose the port used by the application
EXPOSE 3000

# Specify the command to run the application
CMD ["pnpm", "run", "dev"]
