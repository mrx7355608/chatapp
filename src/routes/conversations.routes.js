import { Router } from "express";
import conversationsControllers from "../controllers/conversations.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.use(isAuthenticated);
router.get("/", conversationsControllers.getAllConversations);
router.get("/:id", conversationsControllers.getOneConversation);
router.post("/", conversationsControllers.postCreateNewConversation);

export default router;
