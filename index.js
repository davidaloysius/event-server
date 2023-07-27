const https = require("https");
const bodyParser = require("body-parser");
const nodeFetch = require("node-fetch");
const cors = require("cors");

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let url =
    "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-rqzyr/endpoint/data/v1/action/" + req.get('api-url');
  console.log("[POST] " + url);
  const postData = JSON.stringify(req.body);

  nodeFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": req.get('api-key'),
    },
    body: postData,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((jsonData) => {
      res.status(status).json(jsonData);
    })
    .catch((err) => {
      console.log(err);
    });
});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://sino-g.vercel.app/"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(8080, () => {
  console.log("Started on PORT 8080");
});
