const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

const PORT = 9000;
app.listen(PORT, () => console.log("server started"));