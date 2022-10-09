import { Router } from "express";
import { userRouter } from "../../controllers/userController";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { verifyToken } from "../../middlewares/verifyToken";
const router: Router = Router();

// post a new user
router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);
router.get("/me", verifyToken, userRouter.getMe);
router.get("/user/allusers", verifyToken, verifyAdmin, userRouter.getAllUsers);
router.get("/user/confirm/:token", userRouter.confirmEmail);
export default router;
