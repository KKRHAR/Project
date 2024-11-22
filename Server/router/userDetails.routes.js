const Upload= require('../middleware/multer');
const { detail, uploadJob ,searchJob} = require('../controller/userdetail');


const router = require("express").Router();

router.post("/userDetails",Upload.single('image'), detail);
router.post('/jobUpload',uploadJob)
router.post('/search',searchJob)

module.exports = router; 