# Use Node 22, same as your local environment
FROM node:22

# Set environment to production
ENV NODE_ENV=production

# Set working directory inside the container
WORKDIR /app

# ✅ Copy only the backend-related package.json and lock file first
# This allows Docker to cache npm install layer
# Adjust path if your package.json is in root
COPY package*.json ./

# ✅ Install only production dependencies   
RUN npm install --production

# ✅ Copy the backend folder into the container
# This ensures your backend code (server.js, routes, etc.) is included
COPY backend ./backend

# ✅ Expose the backend server port
EXPOSE 4001

# ✅ Command to run your backend app
CMD ["node", "backend/server.js"]