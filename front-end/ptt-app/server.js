import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { setupReactViews } from "express-tsx-views";
import jws from "jsonwebtoken";

import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const users = [
  {
    username: "admin",
    mail: "admin@admin.com",
    password: "admin",
  },
  {
    username: "dr.strange",
    mail: "strange@smth.com",
    password: "strange",
  },
];

const options = {
  viewsDirectory: path.resolve(__dirname, "../src/views"),
};

setupReactViews(app, options);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("Login");
});

/*
app.get("/users", authenticateToken, (req, res) => {
  res.json(users.filter((user) => user.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
*/
app.listen(3000);
