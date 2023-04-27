const mongoose = require("mongoose")
const { ObjectId } = require("mongodb");

const customerSchema = new mongoose.Schema({
    same_id: ObjectId,
    userName: String,
    shopName: String,
    shopAddress: String,
    number: Number,
    vegitables: [{
        Vagilist: String,
        vagi_id:ObjectId,
        amount:String
    }]
});

const Customer = mongoose.model("CustomerPortal", customerSchema);
module.exports = Customer
