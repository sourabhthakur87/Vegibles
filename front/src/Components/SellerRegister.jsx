import React, { useState } from 'react'
import { useNavigate,NavLink } from "react-router-dom"
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            toast.warn("Shop Already Present", {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        else if (res.status === 422) {
            toast.warn('Fill The Form', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.success('Success', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            navigate("/sellerlogin")
        }
    }
    return (
        <>
            <Navbar />
            <section className='login'>
                <div className="form-box1">
                    <div className="form-value">
                        <form method="post">
                            <h2>Become a Seller</h2>
                            <div className="inputbox">
                                <input type="text" name="userName" onChange={handleData} />
                                <label htmlFor="">UserName</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" name="shopName" onChange={handleData} />
                                <label htmlFor="">Shop Name</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" name="shopAddress" onChange={handleData} />
                                <label htmlFor="">Shop Address</label>
                            </div>
                            <div className="inputbox">
                                <input type="number" name="number" onChange={handleData} />
                                <label htmlFor="">Ph. Number</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" name="password" onChange={handleData} />
                                <label htmlFor="">Password</label>
                            </div>

                            <button onClick={AddSeller}>Submit</button>
                            <div className="register">
                                <p>Already have an account ?
                                    <NavLink onClick={() => navigate("/sellerlogin")}>Log in</NavLink>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={13}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}
