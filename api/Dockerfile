# Installs Node.js image
FROM node:18-alpine

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src

RUN npm install

COPY . .

# Installs all packages
RUN npm run build

# Runs the dev npm run script to build & start the server
CMD ["npm", "run", "start"]

