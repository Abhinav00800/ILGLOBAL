const express=require("express")
const router= express.Router();
const {FetchJobRegisterData,UploadJobRegisterData,FetchJobByShippingNo} = require("../controllers/jobregister.js")

router.get("/fetchjobregisterdata",FetchJobRegisterData);
router.get("/fetchdatabyshippingno/:id",FetchJobByShippingNo);
router.post("/uploadjobregisterdata", UploadJobRegisterData);

module.exports=router;