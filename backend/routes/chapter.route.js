import { Router } from "express";
import { uploadImage,updateSubChapter,getChapters ,getSubChapters,addChapter,addSubchapters} from "../controllers/chapters.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(upload.fields([{ name: "avatar", maxCount: 1 }]), uploadImage);

router.route("/create").post(updateSubChapter);

router.route("/getchapters").get(getChapters);

router.route("/addchapter").post(addChapter);

router.route("/getsubchapters").post(getSubChapters);

router.route("/addsubchapter").post(addSubchapters);



export default router;