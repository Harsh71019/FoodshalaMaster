const express = require("express");
const connectDB = require("./config/db");
const { connect } = require("mongoose");
const path = require("path");
const { resolve } = require("path");
const app = express();

connectDB();

//init middleware

app.use(express.json({ extended: false }));

//Defining the Routes

app.use("/api/users", require("./routes/apis/users"));
app.use("/api/auth", require("./routes/apis/auth"));
app.use("/api/admins", require("./routes/apis/admins"));
app.use("/api/authadmins", require("./routes/apis/authadmin"));
app.use("/api/menu", require("./routes/apis/menu"));
app.use("/api/orders", require("./routes/apis/orders"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
