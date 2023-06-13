import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.findAll);

router.get("/:userId", userController.deleteById);

router.post("/", userController.create);

router.put("/:userId", userController.updateById);

router.delete("/:userId", userController.deleteById);

export const userRouter = router;
