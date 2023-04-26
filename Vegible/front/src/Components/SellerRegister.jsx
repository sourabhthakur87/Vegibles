import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
export default function SellerRegister() {
    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState({
        userName: "",
        shopName: "",
        shopAddress: "",
        number: "",
        password: ""
    })
    const handleData = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value })
    }

    const AddSeller = async (e) => {
        e.preventDefault()
        const { userName, shopName, shopAddress, number, password } = sellerData

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, shopName, shopAddress, number, password
            })
        })

        await res.json();
        if (res.status === 400) {
            alert("Data Present")
        }
        else if (res.status === 422) {
            alert("Fill the form")
        }
        else {
            alert("Login Success")
            navigate("/")
        }
    }
    return (
        <>
            <h1>Seller Login</h1>
            <form method="post">
                <input type="text" name="userName" placeholder='userName' onChange={handleData} />
                <input type="text" name="shopName" placeholder='shopName' onChange={handleData} />
                <input type="text" name="shopAddress" placeholder='shopAddress' onChange={handleData} />
                <input type="number" name="number" placeholder='number' onChange={handleData} />
                <input type="password" name="password" placeholder='Password' onChange={handleData} />
                <button onClick={AddSeller}>Submit</button>
            </form>
            <button onClick={()=>navigate("/")}>Already Have AN Account</button>
        </>
    )
}
