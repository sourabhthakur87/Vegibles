import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ring from "./ring.png"
import Navbar from './Navbar';
export default function CostumerHome() {
    const navigate = useNavigate();
    const [sellerInfo, setsellerInfo] = useState([])
    const [my_search, setmy_search] = useState("");
    const getAllData = async () => {
        try {
            const res = await fetch("/alldata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            console.log(data);
            setsellerInfo(data)
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }


    useEffect(() => {
        getAllData();
        // eslint-disable-next-line
    }, [])

    const [onesellerInfo, setOnesellerInfo] = useState("");
    const [oneSellervaggi, setOneSellerVaggi] = useState([])
    const oneSellerData = async (id) => {
        try {
            const res = await fetch("/onesellerData/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setOnesellerInfo(data)
            setOneSellerVaggi(data.vegitables)
            // console.log(oneSellervaggi);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <Navbar/>
        
            <h1 className='customerheading'>Customer Home</h1>
            <div className='custinp' >
            <input type="text" id='txt' onChange={(e) => setmy_search(e.target.value)} placeholder='Search' />
            </div>
            <div className='container'>
            <div className='custable'>
            <table border="2px" style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>SNO.</th>
                    <th>Seller Name</th>
                    <th>Shop Name</th>
                    <th>Phone</th>
                    <th>address</th>
                    <th>See Available Vagitables</th>
                </tr>
                        </thead>

                {
                    sellerInfo.filter((val) => {
                        if (my_search === "") {
                            return val;
                        }
                        else if (val.userName.toLowerCase().includes(my_search.toLowerCase()) || val.shopAddress.toLowerCase().includes(my_search.toLowerCase()) || val.shopName.toLowerCase().includes(my_search.toLowerCase())) {
                            return val;
                        }
                    }).map((curr, index) => {
                        
                        return (
                            <>
                            <tbody className='cont'>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{curr.userName}</td>
                                    <td>{curr.shopName}</td>
                                    <td>{curr.number}</td>
                                    <td>{curr.shopAddress}</td>
                                    {/* <td><NavLink to={"/onesellerdata/" + curr._id}>Available Vaggies</NavLink></td> */}
                                    <td><button type="button" style={{backgroundColor:'lightgreen',opacity:1,color:'black'}} onClick={() => oneSellerData(curr._id)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Available Veggies
                                    </button></td>
                                </tr>
                                </tbody>
                            </>
                        )
                    })
                }

            </table>
            </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h3>{onesellerInfo.userName}</h3>
                            <h3><img src={ring} alt="ring" />{onesellerInfo.number}</h3>

                            <div className="container">
                                <table border="2px">
                                    <tr>
                                        <th>SNO.</th>
                                        <th>Vegetable</th>
                                        <th>Amount</th>

                                    </tr>
                                    {
                                        oneSellervaggi.map((curr, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{curr.Vagilist}</td>
                                                        <td>{curr.amount}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
