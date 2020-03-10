"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const httpServer = http.createServer(function (request, response) {
    response.write('<h1>FUCK</h1>');
    response.end();
});
httpServer.listen(3000, () => {
    console.log('Sever Open');
});
//# sourceMappingURL=index_http_module.js.map