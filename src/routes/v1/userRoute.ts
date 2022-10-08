import { Router } from "express";
import { userRouter } from "../../controllers/userController";
import { veryfyToken } from "../../middlewares/veryfyToken";
const router: Router = Router();

// post a new user
router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);
router.get("/me", veryfyToken, userRouter.getMe);

export default router;
