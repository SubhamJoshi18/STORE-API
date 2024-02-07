import { Router } from "express";
import * as Controller from "../controller/controller";

const router = Router();

router.post("/", Controller.postFunction);
router.get("/", Controller.getFunction);
router.get("/:id", Controller.getFunctionbyFilter);
router.delete("/", Controller.deleteFunction);
router.put("/", Controller.putFunction);
router.patch("/:id", Controller.patchFunction);

export default router;
