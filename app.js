import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

import playlistManagementRoutes from "./source/playlist-management/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", playlistManagementRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
