# Use the official Node.js image.
FROM node:18

# Install pnpm
RUN npm install -g pnpm

# Create and set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm build

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "dist/server.js"]
