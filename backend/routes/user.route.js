import { Router } from "express";
import { checkroute,uploadImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", checkroute);

router.route("/upload").post(upload.fields([{ name: "avatar", maxCount: 1 }]), uploadImage);

export default router;