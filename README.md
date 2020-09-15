# Application providing client/server functionality for restaurant listings.

## This repository consists of two projects client and server.

### Server
Node.js providing APIs to access

**Usage**
- Prerequisit
You will need to install Gulp globally so that transpilation can occur.<br/>
`yarn global add gulp-cli` or `npm install --global gulp-cli`
- Install
`yarn install` or `npm install`
- Run
`yarn run service` or `npm run service`
- Verify
Open browser and navigate to `http:\\localhost:3000`. <br/>
If you see welcome screen you are good to start the client.<br/>
If you like you can verify the serving of the data by accessing:<br/>
`http:\\localhost:3000\restaurants`

### Client
React application consuming the APIs exposed by the server.

**Usage**
- Install
`yarn install` or `npm install`
- Run
`yarn run webapp` or `npm run webapp`
- Verify
Open browser and navigate to `http:\\localhost:8080`<br/>
You should see the provided data set presented.

## Have fun!
