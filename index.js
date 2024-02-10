require("dotenv").config();
console.log(process.env.PORT);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/admin", (req, res) => {
  res.send("hii sudhansu");
});

app.listen(process.env.PORT, () => {
  console.log(`Go to the page : {http://localhost:${port}/`);
  console.log(`open the profile page : {http://localhost:${port}/admin/`);
});
