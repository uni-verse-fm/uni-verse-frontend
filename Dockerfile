FROM docker.io/node:22-alpine AS build

# Safer workdir@
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY ./package*.json ./
# Install dependencies
RUN npm ci
# Copy source code
COPY . .

# Build static version of the app
RUN npm run build
# Remove unused dev packages
RUN npm prune --omit=dev

# Second stage
FROM docker.io/node:22-alpine

#Set safer workdir
WORKDIR /usr/src/app

# Copy env variables
COPY --from=build /usr/src/app/.env* ./
COPY --from=build /usr/src/app/package*.json ./

# Copy necessary files for the production optimized build
COPY --from=build /usr/src/app/build ./build

EXPOSE 3000
# Command is npm run start
CMD node build
