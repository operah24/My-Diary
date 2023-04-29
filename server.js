require ("dotenv/config");
const express = require ("express");
const  cors = require ("cors") ;
const  routes = require ("./src/routes");
const  morgan = require ("morgan");

const app = express();

require('./src/models/db');
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.send("OK");
});
app.use("/api/v1", routes);



module.exports = app;