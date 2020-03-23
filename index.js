const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const CustomerRoutes = require("./Routes/CustomerService");
const MealRoutes = require("./Routes/MealService");
const LiftRoutes = require("./Routes/LiftService");

var app = express();
app.use(bodyParser.json());

app.use("/customers", CustomerRoutes);
app.use("/meals", MealRoutes);
app.use("/lifts", LiftRoutes);

app.listen(PORT, () => console.log('Listening on Port: ' + PORT));