const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const sellerSchema = new mongoose.Schema({
    same_id: ObjectId,
    userName: String,
    shopName: String,
    shopAddress: String,
    number: Number,
    password: String,
    vegitables: [{
        Vagilist: String,
        vagi_id:ObjectId,
        amount:"String"
    }]
});


sellerSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        return token
    } catch (error) {
        console.log(error);
    }
}

const seller = mongoose.model("SellerPortal", sellerSchema);
module.exports = seller
