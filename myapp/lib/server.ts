// lib/server.ts
import app from "./app";

var path = require('path')
const https = require('https')
const fs = require('fs')
const PORT = process.env.PORT;

const httpsOptions = {
    key: fs.readFileSync(path.resolve('../myapp/lib/config/server.key')),
    cert: fs.readFileSync(path.resolve('../myapp/lib/config/server.crt'))
  }
  

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('server running at ' + process.env.PORT)
    //console.log(process.env)
  })
  /*

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
*/