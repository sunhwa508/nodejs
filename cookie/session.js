const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
 cookie
  .split(";")
  .map(v => v.split("="))
  .reduce((acc, [k, v]) => {
   acc[k.trim()] = decodeURIComponent(v);
   return acc;
  }, {});

const session = {};
//req.session 그 사용자에 대한 고유한 session

http
 .createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith("/login")) {
   const { query } = url.parse(req.url);
   const { name } = qs.parse(query);
   const expires = new Date();
   // 쿠키 유효 시간을 현재시간 + 5분으로 설정
   expires.setMinutes(expires.getMinutes() + 5);
   const uniqueInt = Date.now();
   session[uniqueInt] = {
    name,
    expires,
   };
   res.writeHead(302, {
    Location: "/",
    "Set-Cookie": `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
   });
   res.end();
   // name이라는 쿠키가 있는 경우
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
   res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
   res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
   try {
    const data = await fs.readFile("./cookie2.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
   } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(err.message);
   }
  }
 })
 .listen(8085, () => {
  console.log("8085번 포트에서 서버 대기 중입니다!");
 });

// 실무에서는 보안상 문제가 될 수 있어 express-session 을 사용한다.
