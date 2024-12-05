const Upload= require('../middleware/multer');
const { detail, uploadJob ,searchJob} = require('../controller/userdetail');

const verifyJWt=require("../middleware/Auth")

const router = require("express").Router();

router.post("/userDetails",verifyJWt,Upload.single('image'), detail);
router.post('/jobUpload',verifyJWt,uploadJob)
router.post('/search',searchJob)

module.exports = router;  