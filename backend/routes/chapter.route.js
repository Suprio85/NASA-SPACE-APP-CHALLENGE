import { Router } from "express";
import { uploadImage,createSubChapter } from "../controllers/chapters.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(upload.fields([{ name: "avatar", maxCount: 1 }]), uploadImage);

router.route("/create").post(createSubChapter);





export default router;