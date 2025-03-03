
const jwt=require('jsonwebtoken');

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req,resp,next){
    const authHeaders=req.headers['authorization'];
    const token=authHeaders && authHeaders.split(" ")[1];
    console.log(token);
    if(!token){
        return resp.status(400).json({message:"Token doesn't exist"});
    }
    try{
        jwt.verify(token,ACCESS_TOKEN_SECRET,(error,user)=>{
            if(error){
                return resp.status(400).json({message:error})
            }
            req.user=user;
            next();
        })


    }catch(error){
        return resp.status(500).json({message:"Internal server Error"});

    }

}

function authenticateUser(req,resp,next){
    const role=req.user.role;
    if(role==='admin'){
        req.role=role;
        next();
    }else{
        return resp.status(400).json({message:"Access Denied"})

    }
}

module.exports={authenticateToken,authenticateUser}