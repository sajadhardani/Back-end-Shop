const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors());
const path = require("path");

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
