import express from "express";
import {
  deleteUser,
  getUsers,
  lowerUser,
  promoteUser,
  signIn,
  signUp,
} from "../controllers/auth";
import { verifyToken } from "../controllers/verifyToken";

export function getAuthRouter() {
  const router = express.Router();
  
  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.get("/", getUsers);
  router.post("/promote/:id", verifyToken, promoteUser);
  router.post("/low/:id", verifyToken, lowerUser);
  router.delete("/delete/:id", verifyToken, deleteUser);

  return router;
}
