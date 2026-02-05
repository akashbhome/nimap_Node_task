
let db=require("../config/db.js");


exports.addCate=(name)=>{
    return new Promise((resolve,reject)=>{
        db.query("insert into category (catename) values (?)",[name],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })   
}

exports.viewcate=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from category",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

exports.deletecate=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from category where cid=?",[id],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })   
}

exports.updatecate=(id,name)=>{
    return new Promise((resolve,reject)=>{
        db.query("update category set catename=? where cid=?",[name,id],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })   
}


exports.addproduct=(id,name,cid)=>{
    return new Promise((resolve,reject)=>{
        if (id === undefined || id === null || id === '') {
            db.query("insert into product (pname,cid) values (?,?)",[name,cid],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        } else {
            db.query("insert into product (pid,pname,cid) values (?,?,?)",[id,name,cid],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        }
    })   
}

exports.viewproduct=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from product",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

exports.deleteproduct=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from product where pid=?",[id],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })   
}



exports.updateproduct=(id,name,cid)=>{
    return new Promise((resolve,reject)=>{
        db.query("update product set pname=?,cid=? where pid=?",[name,cid,id],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })   
}