"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes"); //
const app = express_1.default();
app.use(bodyParser.json()); // Body Type을 json으로 받도록 설정. express에서 bodyParser.json()을 사용하기 위해 알려주는 역할
app.use(bodyParser.urlencoded({
    // HTTP 모듈을 사용했을때 url을 인코딩,이벤트처리 등 -> bodyParser.urlencoded()를 통해 간소화
    extended: false,
}));
app.use('/api', routes_1.apiRouter); // apiRouter 객체 사용을 express(app 객체)에게 알림
app.use((req, res) => {
    //
    res.status(400).send('Route not found error');
});
app.set('port', 3000);
http.createServer(app).listen(3000, () => {
    console.log('Server Opened');
});
//# sourceMappingURL=index.js.map