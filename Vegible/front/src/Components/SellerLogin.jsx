import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
export default function SellerLogin() {
    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState({
        shopName: "",
        password: ""
    })
    const handleData = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value })
    }

    const LoginSeller = async (e) => {
        e.preventDefault()
        const { shopName, password } = sellerData

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shopName, password
            })
        })

        await res.json();
        if (res.status === 400) {
            alert("Invalid Credentials")
        }
        else if (res.status === 422) {
            alert("Fill the form")
        }
        else {
            alert("Login Success")
            navigate("/sellerhome")
        }
    }
    return (
        <>
            <h1>Seller Login</h1>
            <form method="post">
                <input type="text" name="shopName" placeholder='shopName' onChange={handleData} />
                <input type="password" name="password" placeholder='Password' onChange={handleData} />
                <button onClick={LoginSeller}>Submit</button>
            </form>
            <button onClick={() => navigate("/sellerregister")}>Create Account</button>
        </>
    )
}
