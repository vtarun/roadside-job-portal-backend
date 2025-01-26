const express = require("express");

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// mongodb+srv://vtarun1:55Lakhs%40cracked!@cluster0.0yapi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0