//1 archivo madre
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require("dotenv").config();
const app = require("./src/app.js");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((error) => console.log(error));
app.listen(port, () => console.log(`Server listening in port`, port));
