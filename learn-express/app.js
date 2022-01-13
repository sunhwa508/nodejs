// http를 사용하고 있는 express
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const morgan = require("morgan");
//전역변수 port 를 설정하는 느낌
app.set("port", process.env.PORT || 3000);
app.use(cookieParser("password"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("요청 경로", express.static(path.join(__dirname, "실제경로")));
// 정적파일들의 경로를 숨겨 보안에 유리하다.
app.use("/", express.static(path.join(__dirname, "public")));
// 개발할때 많이 사용
app.use(morgan("dev"));
// 배포용으로 사용 (더 상세함)
// app.use(morgan("combined"));

// app.use => 모든 코드에서 실행된다.
app.use((req, res, next) => {
 console.log("3 모든 요청에 실행하고싶어요");
 next();
});

//app.get("/" 과 같이 메서드 + 주소 => 라우터 라고 부른다.
//한 라우터에서 여러개의 send 를 보내면 오류
app.get("/", (req, res) => {
 req.cookies; // {mycookie: "test"}
 // 서명화된 쿠키 불러올때
 req.signedCookies;
 //  'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
 res.cookie("name", encodeURIComponent(name), {
  expires: new Date(),
  httpOnly: true,
  path: "/",
 });
 res.clearCookie("name", encodeURIComponent(name), {
  httpOnly: true,
  path: "/",
 });
 // 가져올때 html 파일이 변경되었는지 확인한다.
 res.sendFile(path.join(__dirname, "./index.html"));
 //  res.send("안녕하세여");
 //  res.json({ hello: "hohoho" });
 //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
});
app.post("/", (req, res) => {
 res.status(200).send("hello express");
});

// 같은 라우트가 2개가 있을때
app.get(
 "/about",
 (req, res, next) => {
  res.sendFile(path.join(__dirname, "./index.html"));
  // 바로 아래가 실행되지 않고 다음 라우터가 실행된다.
  next("route");
 },
 (req, res) => {
  console.log("실행 되나요?!");
 },
);
app.get("/about", (req, res) => {
 console.log("실행 되지롱");
 res.sendFile(path.join(__dirname, "./index.html"));
});

// 와일드카드
app.get("/:name", (req, res) => {
 // 가져올때 html 파일이 변경되었는지 확인한다.
 res.send(`hello ${req.params.name}`);
});

// 모든 get 요청에 대해 다 처리하겠다.
app.get("*", (req, res) => {
 // 가져올때 html 파일이 변경되었는지 확인한다.
 res.send(`hello All`);
});

// custom 에러 미들웨어
// 반드시 4가지 매개변수를 다 써야한다.
app.use((err, req, res, next) => {
 console.error(err);
 res.status(404).send("에러났지만 안알려줌");
});

app.listen(app.get("port"), () => {
 console.log("익스프레스 서버 실행");
});
