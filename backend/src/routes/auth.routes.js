import express from "express";
import { signup,login ,currentUser} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me",auth,currentUser);

export default router;