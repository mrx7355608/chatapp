import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import messagesControllers from "../controllers/messages.controllers.js";

const router = Router();

router.use(isAuthenticated);
router.get("/:id", messagesControllers.getAllMessages);

export default router;
