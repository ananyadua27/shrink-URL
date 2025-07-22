import express from "express";
import { createUrl, getAllUrl, getUrl, delUrl } from "../controllers/shortUrl.js";
const router = express.Router();
router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", delUrl);
export default router;
