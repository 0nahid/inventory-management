import { Router } from "express";
import { userRouter } from "../../controllers/userController";
const router: Router = Router();

// post a new user
router.post("/login", userRouter.createUser);

export default router;
