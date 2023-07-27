const https = require("https");
const bodyParser = require("body-parser");
const nodeFetch = require("node-fetch");
const cors = require("cors");

const express = require("express");
const router = express.Router();

router.post("/events", (req, res) => {
  let url =
    "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-rqzyr/endpoint/data/v1/action/find";
  console.log("[POST] " + url);

  const postData = JSON.stringify({
    collection: "Thugs Ultimate Events",
    database: "ultimate_events",
    dataSource: "Cluster0",
  });

  nodeFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "xd12Uz1jPNghWAhmBnHhlfpAnhM8ypv3mH8Fx7OeJOTl7mIlpzOrGVQp0HplVL21",
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
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(8080, () => {
  console.log("Started on PORT 8080");
});
