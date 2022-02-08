# NPM

## cluster

자바스크립트는 기본적으로 싱글 스레드 방식으로 보통 8개의 코어중 한가지만 사용한다.<br>
하지만 cluster을 사용하면 cpu코어를 모두 사용할 수 있게 해주어 효율적으로 프로세스를 돌릴 수 있다.<br>
성능은 개선되지만 1개의 cpu 에서 8개가 동작한다고 해서 8배 좋아지는 것은 아님 주의!<br>

## npm 버저닝으로 사용되는 Semver 버저닝

> 12.3.215 <br>
> major . minor . patch

major 넘버가 바뀌면 프로그램이 작동하지 않는다 를 의미 <br>
patch는 마이너한 버그 수정시 사용됨

#### Package 업데이트시

`^ 1.2.45` = 첫번째 자리 고정<br>
`~ 2.3.51` = 두번째 자리 고정<br>
아무것도 쓰지 않는 경우 = 고정 하지 않음<br>

`npm outdated` 어떤 패키지에 기능 변화가 생겼는지 알 수 있음

### npm ls inherits

![](https://images.velog.io/images/sunhwa508/post/79d413b5-6c96-45ac-8102-430e7695d6ef/image.png)

# EXPRESS

```javascript
// http를 사용하고 있는 express
const express = require("express");
const path = require("path");
const app = express();

//전역변수 port 를 설정하는 느낌
app.set("port", process.env.PORT || 3000);

// app.use => 모든 코드에서 실행된다.
app.use((req, res, next) => {
  console.log("모든 요청에 실행하고싶어요");
  // next() 를 써 줘야 다음코드로 넘어가 실행된다.
  next();
});

//app.get("/" 과 같이 메서드 + 주소 => 라우터 라고 부른다.
app.get("/", (req, res) => {
  // 가져올때 html 파일이 변경되었는지 확인한다.
  res.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/", (req, res) => {
  res.send("hello express");
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});

// 와일드카드 = 항상 다른 라우터 아래에 위치해야한다.
app.get("/:name", (req, res) => {
  // 가져올때 html 파일이 변경되었는지 확인한다.
  res.send(`hello ${req.params.name}`);
});

// 모든 get 요청에 대해 다 처리하겠다.
app.get("*", (req, res) => {
  // 가져올때 html 파일이 변경되었는지 확인한다.
  res.send(`hello All`);
});
```

### 미들웨어

![](https://images.velog.io/images/sunhwa508/post/c4d676ed-31d9-425b-9649-4594b3fdb83e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-13%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2010.48.37.png)

미들웨어를 연속으로 사용 할 수 있다.

```javascript
app.use(
  (req, res, next) => {
    console.log("1 모든 요청에 실행하고싶어요");
    // next() 를 써 줘야 다음코드로 넘어가 실행된다.
    next();
  },
  (req, res, next) => {
    console.log("2 모든 요청에 실행하고싶어요");
    next();
  },
  (req, res, next) => {
    console.log("3 모든 요청에 실행하고싶어요");
    next();
  },
);
```

### status(200) 생략가능

```javascript
app.post("/", (req, res) => {
  res.status(200).send("hello express");
});
```

### custom 에러 미들웨어

```javascript
// 반드시 4가지 매개변수를 다 써야한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러났지만 안알려줌");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
```

## http VS express

```javascript
//http
if (req.method === "GET") {
  if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("hello express");
  }
}
//express
app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("hello express");
});
```

```javascript
//http
if (req.method === "GET") {
  if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ hello: "hello express" }));
  }
}
//express
app.get("/about", (req, res) => {
  res.json({ hello: "hello express" });
});
```

## next("route") 분기처리 (중복을 줄일 수 있다)

```javascript
app.get(
  "/about",
  (req, res, next) => {
    res.sendFile(path.join(__dirname, "./index.html"));

    if (true) {
      // 바로 아래가 실행되지 않고 다음 라우터가 실행된다.
      next("route");
    } else {
      next();
    }
  },
  (req, res) => {
    console.log("실행 되나요?!");
  },
);
app.get("/about", (req, res) => {
  console.log("실행 되지롱");
  res.sendFile(path.join(__dirname, "./index.html"));
});
```

## morgan, bodyparser, cookie-parser

morgan : 서버로 들어온 요청과 응답을 기록해주는 미들웨어<br>
body-parser : 요청의 본문을 해석해주는 미들웨어<br>

- 폼 데이터나 AJAX 요청의 데이터 처리<br>
  cookie-parser : 요청 헤더의 쿠키를 해석해주는 미들웨어<br>

bodyparser 은 더이상 사용하지 않는다. (express 에서 가져와서 사용)

> 요청과 응답을 기록하는 라우터

```javascript
const morgan = require("morgan");

app.use(morgan("dev"));
```

```javascript
const cookieParser = require("cookie-parser");

app.use(cookieParser("password"));

app.get("/", (req, res) => {
  req.cookies; // {mycookie: "test"}
  // 서명화된 쿠키 불러올때(cookieParser에 비밀번호를 넣은 경우)
  req.signedCookies;
  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  });
  res.clearCookie("name", encodeURIComponent(name), {
    httpOnly: true,
    path: "/",
  });
});
```

## express.json() unrlencoded() 를 사용하면

```javascript
// before
let body = "";
// 요청의 body를 stream 형식으로 받음
req.on("data", data => {
  body += data;
});
// 요청의 body를 다 받은 후 실행됨
return req.on("end", () => {
  console.log("POST 본문(Body):", body);
  const { name } = JSON.parse(body);
  const id = Date.now();
  users[id] = name;
  res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("ok");
});
```

```javascript
//after
//body parser가 express안으로 들어가 아래와 같이 사용된다.
app.use(express.json());

//클라이언트에서 form submit 할때
app.use(express.urlencoded({ extended: true }));
// true면 qs, false 면 querystring

app.get("/", (req, res) => {
  req.body.name;
  res.sendFile(path.join(__dirname, "index.html"));
});
```

## static 미들웨어

> 정적파일들의 경로를 숨겨 보안에 유리하다.
> 요청경로와 실제경로가 다르다.
> 서버 구조를 전혀 예측할 수 없게 한다.

```javascript
// app.use("요청 경로", express.static(path.join(__dirname, "실제경로")));
app.use("/", express.static(path.join(__dirname, "public")));
```

localhost:3000/zerocho.html 을 요청했다면 <br>
실제로 우리의 파일 경로는 learn-express/public/zerocho.html

## express-session 미들웨어

// 서명돼서 읽을수 없는 문자열로 반환됨

```javascript
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "password",
    cookie: {
      // 자바스크립트로 부터 공격을 안당하기 위해
      httpOnly: true,
    },
  }),
);
```

## 미들웨어들 간 데이터 전송

```javascript
app.use("/", (req, res) => {
  req.data = "my_password";
});

app.get("/", (req, res, next) => {
  req.data; // my_password
});
```

## multer

form태그의 enctype이 multipart/form-data인 경우

- body-parser로는 요청 본문을 해석 할 수 없음
- multer 패키지 필요!

# PUG

템플릿 엔진

### Pug 설정

```javascript
const app = express();
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // 확장자 지정
```

> ex) 사용 예

![image](https://user-images.githubusercontent.com/61695175/152937626-52c33b54-5a70-4c44-94fd-616edd16baf4.png)

# Nunjucks(넌적스)

## Numjucks 설정하기

`$ npm i numjucks`

```javascript
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html"); // 확장자 지정

nunjucks.configure("views", {
  express: app,
  watch: true,
});
```

> ex) 사용 예

![image](https://user-images.githubusercontent.com/61695175/152938847-409f5286-b313-4612-83d2-a711f47db5c2.png)
