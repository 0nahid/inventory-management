import { Router } from "express";
import { userRouter } from "../../controllers/userController";
const router: Router = Router();

// post a new user
router.post("/", userRouter.createUser);

export default router;
