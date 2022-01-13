# NPM

## cluster

자바스크립트는 기본적으로 싱글 스레드 방식으로 보통 8개의 코어중 한가지만 사용한다.
하지만 cluster을 사용하면 cpu코어를 모두 사용할 수 있게 해주어 효율적으로 프로세스를 돌릴 수 있다.
성능은 개선되지만 1개의 cpu 에서 8개가 동작한다고 해서 8배 좋아지는 것은 아님 주의!

## npm 버저닝으로 사용되는 Semver 버저닝

> 12.3.215 <br>
> major . minor . patch

major 넘버가 바뀌면 프로그램이 작동하지 않는다 를 의미 <br>
patch는 마이너한 버그 수정시 사용됨

#### Package 업데이트시

`^ 1.2.45` = 첫번째 자리 고정<br>
`~ 2.3.51` = 두번째 자리 고정<br>
아무것도 쓰지 않는 경우 = 고정 하지 않음<br>

`npm ourdated` 어떤 패키지에 기능 변화가 생겼는지 알 수 있음

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

### http VS express

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
