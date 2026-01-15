import { Router } from "express";
import { PCQuery } from "../controller/postalCodeController.js";
import { PCValidation } from "../middleware.ts/validationMw.js";

const router = Router();

router.post("/postalCode", PCValidation, PCQuery);

export default router;
