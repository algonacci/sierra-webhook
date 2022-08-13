const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[SERVER] Sierra webhook listening on port ${port}`)
  })

app.get("/", (req, res) => {
  res.send("Sierra Webhook!");
});
