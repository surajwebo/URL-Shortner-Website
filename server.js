const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const urlMap = {};

app.post("/shorten", (req, res) => {
  const longUrl = req.body.url;
  const shortCode = crypto.randomBytes(3).toString("hex");

  urlMap[shortCode] = longUrl;

  res.json({
    shortUrl: `http://localhost:3000/${shortCode}`
  });
});

app.get("/:code", (req, res) => {
  const longUrl = urlMap[req.params.code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
