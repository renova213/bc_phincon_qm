import express from "express";
import appSectionController from "../controllers/app.section.controllers.js";

const router = express.Router();

router.get("/app-sections", appSectionController.getAllAppSections);
router.get("/app-sections/:appId", appSectionController.getAppSectionById);

export default router;
