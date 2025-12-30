import express from "express"
import auth from "../middleware/auth.middleware.js"
import adminOnlyPanel from "../middleware/admin.middleware.js"


import {
    getAllUser,
    activateUser,
    deactivateUser,
    updateProfile,
    changePassword
} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/",auth, adminOnlyPanel,getAllUser);
router.put("/:id/activate",auth,adminOnlyPanel,activateUser);
router.put("/:id/deactivate",auth,adminOnlyPanel,deactivateUser);

router.put("/me",auth,updateProfile);
router.put("/change-password",auth,changePassword);

export default router;