import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import accunt from "./account.png"
import Navbar2 from './Navbar2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SellerHome() {
    const navigate = useNavigate();

    const [sellerData, setSellerData] = useState("")
    const [vegitables, setVegitable] = useState([])

    const getSellerData = async () => {
        try {
            const res = await fetch("/sellerdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            // console.log(data);
            setSellerData(data)
            setVegitable(data.vegitables)

        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    const [addvagi, setaddvagi] = useState({
        Vagilist: "",
        amount: ""
    })
    const handleVaggies = (e) => {
        setaddvagi({ ...addvagi, [e.target.name]: e.target.value })
    }

    const AddVagitables = async (e) => {
        e.preventDefault();
        const { Vagilist, amount } = addvagi

        const res = await fetch("/addVagitable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Vagilist, amount
            })
        })

        await res.json();
        if (res.status === 422) {
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
            toast.success('Vegetable Added Success', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            setaddvagi({ Vagilist: "", amount: "" });
            // navigate("/sellerhome")
        }
    }


    const deleteVegitable = async (id) => {
        if (window.confirm("Are You Sure to delete Member ") === true) {
            const res = await fetch("/deletevegitable/" + id, {
                method: "delete"
            })

            if (res.status === 200) {
                toast.success('Delete Success', {
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
                toast.warn('Not Deletes', {
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
        }
    }

    useEffect(() => {
        getSellerData()
        // eslint-disable-next-line
    }, [vegitables])
    return (
        <>
            <Navbar2 name={sellerData.userName}/>
            <h1 className='customerheading'>Seller Home</h1>
            <div className='data'>

                <h1 className='heading'>Add Your Veggies</h1>
                <h1 className='name'><img src={accunt} alt="img" />{sellerData.userName}</h1>
            </div>
            <form method="post">
                <div className='form'>
                    <div className='selinp' >
                        <input type="text" placeholder='Vegetables Name' name='Vagilist' autoComplete='off' onChange={handleVaggies} />
                        <input type="number" placeholder='Amount' name='amount' onChange={handleVaggies} />
                        <button onClick={AddVagitables} >Add Vaggies</button>
                    </div>

                </div>
            </form>
<hr style={{border:"2px solid green"}} />
            <div className='container'>
                <div className='custable'>
                    <table border="2px">
                        <tr>
                            <th>SNO.</th>
                            <th>Vegitable</th>
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>

                        {
                            vegitables.map((curr, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{curr.Vagilist}</td>
                                            <td>{curr.amount}</td>
                                            <td><button style={{ backgroundColor: 'lightgreen', opacity: 1, color: 'black' }} onClick={() => deleteVegitable(curr.vagi_id)}>Delete</button></td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </table>
                </div>
            </div>

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
