import { Router } from "express";
import { catagoryRouter } from "../../controllers/catagoryController";
const router: Router = Router();

router
  .route("/")
  .get(catagoryRouter.getAllCatagory)
  .post(catagoryRouter.createCatagory);

router.get("/id", catagoryRouter.getSingleCatagory);

export default router;
