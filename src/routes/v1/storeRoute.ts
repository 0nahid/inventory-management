import { Router } from "express";
import { storeRouter } from "../../controllers/storeController";
const router: Router = Router();

router.post("/", storeRouter.createStore);
router.get("/", storeRouter.getAllStores);
router.get("/:id", storeRouter.getSingleStore);

export default router;
