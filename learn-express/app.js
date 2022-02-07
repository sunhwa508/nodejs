// http를 사용하고 있는 express
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const app = express();
// 요청마다 개인의 저장 공간을 만들어 주는 것 -> express session
//전역변수 port 를 설정하는 느낌
app.set("port", process.env.PORT || 3000);
app.use(cookieParser(process.env.COOKIE_SECRET));
// 서명돼서 읽을수 없는 문자열로 반환됨
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 자바스크립트로 부터 공격을 안당하기 위해
      httpOnly: true,
    },
  }),
);
// app.use("요청 경로", express.static(path.join(__dirname, "실제경로")));
// 정적파일들의 경로를 숨겨 보안에 유리하다.
// 미들웨어 확장법
app.use("/", (req, res, next) => {
  if (req.session.id) {
    // 로그인을 했다면 관련 내용을 프론트로 전달
    express.static(__dirname, "public")(req, res, next);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 개발할때 많이 사용
app.use(morgan("dev"));
// 배포용으로 사용 (더 상세함)
// app.use(morgan("combined"));

const multer = require("multer");
const fs = require("fs");

// Sync 서버 시작전 확인해야하는 부분
try {
  ts.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    // 어디에 저장할지 (현재 폴더의 uploads 폴더)
    destination(req, file, done) {
      done("에러처리", "성공할때 처리");
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자 추출
      // 이름이 같으면 덮어씌어지기 때문에 Date.now() 추가 해준다 ms 까지 체크
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

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
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
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
