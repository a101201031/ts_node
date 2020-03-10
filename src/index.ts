import express, { Request, Response, NextFunction, Router } from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { apiRouter } from './routes';

const app = express();

app.use(bodyParser.json()); // Body Type을 json으로 받도록 설정. express에서 bodyParser.json()을 사용하기 위해 알려주는 역할
app.use(
  bodyParser.urlencoded({
    // HTTP 모듈을 사용했을때 url을 인코딩,이벤트처리 등 -> bodyParser.urlencoded()를 통해 간소화
    extended: false,
    /* extended true는 qs library, false는 querystring library 사용.
    qs : 쿼리 스트링에서 다중 객체 생성 가능 ex) "person[name]=bobby&person[age]=3" 의 결과 { person : { name : "bobby", age : "3"} }, 
    querystring : 쿼리 스트링에서 다중 객체 생성 불가 ex) "person[name]=bobby&person[age]=3" 의 결과 { person[age] : 3 , person[name] : "bobby"}
    */
  })
);

app.use('/', apiRouter); // 해당 url로 요청이 들어오면 요청을 apiRouter로 보냄

app.use((req, res) => {
  // 나머지 갈길잃은 요청들에게 400에러를 뿌려주는 역할
  res.status(400).send('Route not found error');
});

app.set('port', 3000); // port 3000으로 요청을 받음
http.createServer(app).listen(3000, () => {
  // port 3000으로 Open
  console.log('Server Opened');
});
