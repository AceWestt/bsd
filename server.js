require("dotenv").config({ path: "./config.env" });
const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
global.__basedir = __dirname;

connectDB();

const app = express();

app.use(express.json());
app.use(fileUpload());

app.use("/api/navigation", require("./routes/navigation"));
app.use("/api/mainscreen", require("./routes/mainscreen"));
app.use("/api/aboutscreen", require("./routes/aboutscreen"));
app.use("/api/servicesscreen", require("./routes/servicesscreen"));
app.use("/api/portfolioscreen", require("./routes/portfolioscreen"));
app.use("/api/contactscreen", require("./routes/contactscreen"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
