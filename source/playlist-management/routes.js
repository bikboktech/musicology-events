import express from "express";

import download from "./download/index.js";

const SERVICE_NAME = "playlist-management";

const router = express.Router();

router.post(`/${SERVICE_NAME}/download`, download);

export default router;
