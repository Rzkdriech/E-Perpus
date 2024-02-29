import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// session
import session from "express-session";
import { MemoryStore } from "express-session";

app.use(
  session({
    cookie: {
      maxAge: 900000,
      secure: false,
      sameSite: true
    },
    secret: "halogays",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore()
  })
);

// routes management
import userRoute from "./src/routes/User.js";
import bukuRoute from "./src/routes/Buku.js";
import kategoriRoute from "./src/routes/Kategori.js";
import katRelasi from "./src/routes/KategoriRelasi.js";
import authRoute from "./src/routes/Auth.js";

const routes = [userRoute, bukuRoute, kategoriRoute, katRelasi, authRoute];

routes.forEach((route) => {
  app.use(route);
});

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
