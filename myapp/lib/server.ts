// lib/server.ts
import app from "./app";

const https = require('https')
const PORT = process.env.PORT;

https.createServer(app).listen(PORT, () => {
    console.log('server running at ' + process.env.PORT)
  })
 