import { Router } from "express";
import messagesControllers from "../controllers/messages.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.use(isAuthenticated);

router.get("/:id", messagesControllers.getMyMessages);

export default router;
