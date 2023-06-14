import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.findAll);

router.get("/:userId", userController.deleteById);

router.post("/", userMiddleware.isCreateValid, userController.create);

router.put("/:userId", userMiddleware.isupdateValid, userController.updateById);

router.delete("/:userId", userController.deleteById);

export const userRouter = router;
