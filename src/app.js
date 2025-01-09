import express from "express";
import path from "path";

const app = express();

//set static folder
app.use(express.static(path.join("public")));

export default app;