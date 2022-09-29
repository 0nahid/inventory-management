import { Router } from "express";
import { storeRouter } from "../../controllers/storeController";
const router: Router = Router();

router.post("/", storeRouter.createStore);
router.get("/", storeRouter.getAllStores);

export default router;
