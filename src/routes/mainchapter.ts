import express from "express";

import {
    getMainChapter,
    getMainChapterById,
    createMainChapter,
    deleteMainChapterById,
    updateMainChapter,
    createSubChapter,
    deleteSubChapter,
    updateSubChapterById

} from "../controllers/mainchapter";
import { verifyToken } from "../controllers/verifyToken";


export function getMainChapterRouter() {
  const router = express.Router();
  
  router.get("/", getMainChapter);
  router.get("/:id", getMainChapterById);
  router.post("/", verifyToken, createMainChapter);
  router.post("/update/:id", updateMainChapter);
  router.delete("/:id", deleteMainChapterById);
  router.post("/createSubChapter/:id", createSubChapter);
  router.post("/deleteSubChapter/:id/:subchapterId", deleteSubChapter);
  router.post("/updateSubChapter/:id/:subchapterId", updateSubChapterById);




  return router;
}