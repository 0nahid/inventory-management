import { Router } from "express";
import { userRouter } from "../../controllers/userController";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { veryfyToken } from "../../middlewares/veryfyToken";
const router: Router = Router();

// post a new user
router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);
router.get("/me", veryfyToken, userRouter.getMe);
router.get("/user/allusers", veryfyToken, verifyAdmin, userRouter.getAllUsers);

export default router;
