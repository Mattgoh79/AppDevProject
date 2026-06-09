/**
 * @file Manages all operations related to institutions
 * @author matt
 */
import express from "express";
import cors from "cors";
import compression from "compression";
// import isContentTypeApplicationJSON from "./middleware/content-type.js";

// import indexRoutes from "./routes/index.js";
import artistRoutes from "./routes/artist.js";
import songRoutes from "./routes/song.js";
// import playerRoutes from "./routes/player.js";
// import authRoutes from "./routes/auth.js";
// import courseRoutes from "./routes/course.js";


const app = express();

const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";

// app.use(isContentTypeApplicationJSON);

app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded (form) data
app.use(express.json()); // Parses JSON request bodies
app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);



app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello, World!",
    firstName: "John",
    lastName: "Doe",
    age: 20,
    hobbies: ["Reading", "Gaming", "Cooking"],
  });
});

app.get("/progLangs", (req, res) => {
  return res.status(200).json({
    progLangs: [
      { name: "C++", author: "Bjarne Stroustrup" },
      { name: "Java", author: "James Gosling" },
      { name: "JavaScript", author: "Brendan Eich" },
      { name: "Python", author: "Guido van Rossum" },
      { name: "Ruby", author: "Yukihiro Matsumoto" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

export default app;
