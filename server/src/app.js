//2 archivo hijo

const express = require("express");
const { CreateRoles } = require("./libs/createRoles.js");
const materialsRoutes = require("./routes/materials.Routes.js");
// const recyclingcenterRoutes = require("./routes/recyclingcenter.Routes.js");
// const recollectionRoutes = require("./routes/recollection.Routes.js");
// const userRoutes = require("./routes/user.Routes.js");
const authUserRoutes = require("./routes/authUser.Routes.js");
// const authAdminRoutes = require("./routes/authAdmin.Routes.js");
const pointsRoutes = require("./routes/recyclingcenter.Routes")

const cors = require("cors");
const app = express();

//middleware:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
CreateRoles();
// app.use("/recollection", recollectionRoutes);
// app.use("/recyclingcenter", recyclingcenterRoutes);
app.use("/materials", materialsRoutes);
// app.use("/users", userRoutes);
app.use("/authUser", authUserRoutes);
// app.use("/authAdmin", authAdminRoutes);
app.use("/recycking-center", pointsRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

module.exports = app;
