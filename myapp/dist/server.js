"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/server.ts
const app_1 = require("./app");
const http = require('http');
const PORT = process.env.PORT;
http.createServer(app_1.default).listen(PORT, () => {
    console.log('server running at ' + process.env.PORT);
});
//# sourceMappingURL=server.js.map