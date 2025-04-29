import express from "express";
import bookController from "../dist/controller/book_controller.js";
const route = express.Router();
route.post("/books", bookController.getBooks());
