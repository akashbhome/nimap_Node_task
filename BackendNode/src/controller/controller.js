let model=require("../model/model.js");

exports.addCate=(req,res)=>{
   
    let {name}=req.body;
    model.addCate(name).then((result)=>{
         if(result.affectedRows>0){
                res.send({ message: "Category Added Successfully" });
        }
        else{
            res.send({ message: "category Not Added" });
        }
         
    }).catch((err)=>{
        console.error('addCate error:', err);
        res.status(500).send({ error: err.message || 'Error occured in Query' });
    });
};

exports.viewcate=(req,res)=>{
    model.viewcate().then((result)=>{
        if(result.length>0){
            res.send({r:result});
        }
        else{
            res.send({r:[]});
        }
    }).catch((err)=>{
        res.send("error"+err);
    });
}

exports.deletecate=(req,res)=>{
   
   let id=parseInt(req.query.id);
    console.log(id);
    model.deletecate(id).then((r)=>{
       if(r.affectedRows>0){
              res.send({ message: "delete Successfully" });
       }else{
             res.send({ message: "category not found" });
       } 
    }).catch((err)=>{
        res.send("error coure in query");
    }); 
};

exports.updatecate=(req,res)=>{
    let id=parseInt(req.query.id);
    let {name}=req.body;
    model.updatecate(id,name).then((r)=>{
        console.log(r);
       if(r.changedRows>0){
            res.send({ message: "update Successfully" });
       }else{
              res.send({ message: "category not update" });
       } 
    }).catch((err)=>{
        res.send("error coure in query");
    }); 
}


exports.addproduct=(req,res)=>{
    let {id,name,cid}=req.body;

    model.addproduct(id,name,cid).then((result)=>{
        if(result.affectedRows>0){
            res.send({ message: "Product Added Successfully" });
        }
        else{
            res.send({ message: "Product Not Added" });
        }
         
    }).catch((err)=>{
        console.error('addproduct error:', err);
        res.status(500).send({ error: err.message || 'Error occured in Query' });
    });
}


exports.viewproduct=(req,res)=>{
    model.viewproduct().then((result)=>{
        if(result.length>0){
            res.send({r:result});
        }
        else{
            res.send({r:[]});
        }
    }).catch((err)=>{
        res.send("error"+err);
    });
}

exports.deleteproduct=(req,res)=>{
   
   let id=parseInt(req.query.id);
    console.log(id);
    model.deleteproduct(id).then((r)=>{
       if(r.affectedRows>0){
              res.send({ message: "delete Successfully" });
       }else{
             res.send({ message: "Product not found" });
       } 
    }).catch((err)=>{
        res.send("error coure in query"+err);
    }); 
};


exports.updateproduct=(req,res)=>{
    let id=parseInt(req.query.id);
    let {name,cid}=req.body;
    model.updateproduct(id,name,cid).then((r)=>{
        console.log(r);
       if(r.changedRows>0){
            res.send({ message: "update Successfully" });
       }else{
              res.send({ message: "product not update" });
       } 
    }).catch((err)=>{
        res.send("error coure in query");
    }); 
}