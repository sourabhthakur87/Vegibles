const jwt = require("jsonwebtoken")
const seller = require("../Schema/SchemaSeller")

const SellerAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwtoken;
        const verify  = jwt.verify(token,process.env.SECRET_KEY)
        const rootUser = await seller.findOne({_id:verify})
        if (!rootUser) {
            throw new Error("User Not Found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        req.same_id = rootUser.same_id
        next();
    } catch (error) {
        res.status(401).send("UnAuthorise")
        console.log(error);
    }
}

module.exports = SellerAuth