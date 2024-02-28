import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes management
import userRoute from "./src/routes/User.js"

const routes = [
    userRoute,
  ];

routes.forEach((route) => {
app.use(route);
});
  

app.listen(PORT, () => console.log(`Server running in ${PORT}`));