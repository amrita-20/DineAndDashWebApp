import express from "express";
import MenuController from "../controller/MenuController";

const router = express.Router();

router.get("/", MenuController.getMenu);

export default router;
