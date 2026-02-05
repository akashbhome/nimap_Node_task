let express=require("express");
let controller=require("../controller/controller.js");
let router=express.Router();


router.post("/addcate",controller.addCate);
router.get("/viewcate",controller.viewcate);
router.delete("/deletecate",controller.deletecate);
router.put("/updatecate",controller.updatecate);


router.post("/addproduct",controller.addproduct);
router.get("/viewproduct",controller.viewproduct);
router.delete("/deleteproduct",controller.deleteproduct);
router.put("/updateproduct",controller.updateproduct);
module.exports=router;