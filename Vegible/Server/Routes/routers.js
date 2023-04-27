const express = require("express")
const routes = express.Router();
const seller = require("../Schema/SchemaSeller");
const bcrypt = require("bcryptjs")
const SellerAuth = require("../auth/sellerAuth")
const customer = require("../Schema/CustomerSchema")
const ObjectId = require("mongodb").ObjectId

routes.get("/sellerdata", SellerAuth, (req, res) => {
    res.send(req.rootUser)
})

routes.get("/alldata", async (req, res) => {
    const alldata = await customer.find();
    res.send(alldata)
})

routes.get("/onesellerData/:id", async (req, res) => {
    const _id = req.params.id;
    // console.log(_id);
    const oneseller = await customer.findOne({ _id: _id })
    // console.log(oneseller);
    res.send(oneseller)
})

routes.post("/register", async (req, res) => {
    const { userName, shopName, shopAddress, number, password } = req.body
    const same_id = new ObjectId();
    if (!userName || !shopName || !shopAddress || !number || !password) {
        return res.status(422).json({ error: "Fill All The Fields" })
    }

    const alreadySeller = await seller.findOne({ shopName })

    if (alreadySeller) {
        return res.status(400).json({ error: "Seller Already Present" })
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(password, salt)
        const newSeller = new seller({ userName, shopName, shopAddress, number, password: securePass, same_id })
        const allSeller = new customer({ userName, shopName, shopAddress, number, same_id })
        allSeller.save();
        newSeller.save();
        res.status(200).json(newSeller)
    }
})


routes.post("/login", async (req, res) => {
    const { shopName, password } = req.body
    if (!shopName || !password) {
        return res.status(422).json({ error: "Fill All The Fields" })
    }
    try {
        const sellerPresent = await seller.findOne({ shopName })
        if (!sellerPresent) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        else {
            const validPass = await bcrypt.compare(password, sellerPresent.password)
            if (validPass) {
                const token = await sellerPresent.generateAuthToken();
                res.cookie("jwtoken", token)
                res.status(200).json("Login Success")
            }
            else {
                return res.status(400).json({ error: "Invalid Credentials" })
            }
        }
    } catch (error) {
        console.log(error);
    }
})


routes.post("/addVagitable", SellerAuth, async (req, res) => {
    const { Vagilist, amount } = req.body
    const vagi_id = new ObjectId();
    if (!Vagilist) {
        return res.status(422).json({ error: "Fill All The Fields" })
    }

    try {
        const sellerPresent = await seller.findOne({ _id: req.userID })
        const allSellerPresent = await customer.findOne({ same_id: req.same_id })

        if (sellerPresent) {
            const newvegi = sellerPresent.vegitables.push({ Vagilist, vagi_id, amount });
            const allSellernewvegi = allSellerPresent.vegitables.push({ Vagilist, vagi_id, amount });
            allSellerPresent.save();
            await sellerPresent.save();
            res.status(200).json({ message: "Vagitable Added Successfully" })
        }
    } catch (error) {
        console.log(error);
    }
})

routes.delete("/deletevegitable/:id", SellerAuth, async (req, res) => {
    const _id = req.params.id;
    const seller_id = req.same_id

    const deleteVegitable = await seller.updateOne({ same_id: seller_id }, { "$pull": { "vegitables": { "vagi_id": _id } } }, { safe: true, multi: true })
    const deleteVegitableallSeller = await customer.updateOne({ same_id: seller_id }, { "$pull": { "vegitables": { "vagi_id": _id } } }, { safe: true, multi: true })
    if (!deleteVegitable && !deleteVegitableallSeller) {
        return res.status(400).send()
    }
    // res.status(200).json({ message: "UserDeletes" })
    res.status(200).send(req.rootUser);
    console.log("Deleted");
})






routes.get("/logoutuser", async (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    // console.log("Logout");
    res.status(200).json({ message: "User Logout" })
})


module.exports = routes