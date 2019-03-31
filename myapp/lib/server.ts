// lib/server.ts
import app from "./app";

const http = require('http')
const PORT = process.env.PORT;

http.createServer(app).listen(PORT, () => {
    console.log('server running at ' + process.env.PORT)
  })
 