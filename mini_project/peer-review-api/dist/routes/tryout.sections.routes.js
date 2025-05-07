import express from "express";
import TryoutSectionController from "../controllers/tryout.section.controllers.js";
const router = express.Router();
router.get("/tryout-sections", TryoutSectionController.getAllTryoutSections);
router.get("/tryout-sections/:tryoutSectionId", TryoutSectionController.getTryoutSectionById);
export default router;
