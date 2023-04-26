import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    })
    const handleVaggies = (e) => {
        setaddvagi({ ...addvagi, [e.target.name]: e.target.value })
    }

    const AddVagitables = async (e) => {
        e.preventDefault();
        const { Vagilist } = addvagi

        const res = await fetch("/addVagitable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Vagilist
            })
        })

        await res.json();
        if (res.status === 422) {
            alert("Fill the form")
        }
        else {
            alert("Vagitable Added SuccessFully")
            setaddvagi({ Vagilist: "" })
            navigate("/sellerhome")
        }
    }


    const deleteVegitable = async (id) => {
        if (window.confirm("Are You Sure to delete Member ") === true) {
            const res = await fetch("/deletevegitable/" + id, {
                method: "delete"
            })

            if (res.status === 200) {
                alert("Delete Success")
            }
            else {
                alert("Not Delete")
            }
        }
    }

    useEffect(() => {
        getSellerData()
        // eslint-disable-next-line
    }, [vegitables])
    return (
        <>
            <h1>Seller Home</h1>
            <h1>{sellerData.userName}</h1>

            <h1>Add Vaggies</h1>
            <form method="post">
                <input type="text" placeholder='Add Vaggies' name='Vagilist' onChange={handleVaggies} />
                <button onClick={AddVagitables}>Add Vaggies</button>
            </form>

            <h1>------------------------------------------------------------------------------</h1>

            <table border="2px">
                <tr>
                    <th>SNO.</th>
                    <th>Vegitable</th>
                    <th>Delete</th>
                </tr>

                {
                    vegitables.map((curr, index) => {
                        return (
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{curr.Vagilist}</td>
                                    <td><button onClick={() => deleteVegitable(curr.vagi_id)}>Delete</button></td>
                                </tr>
                            </>
                        )
                    })
                }

            </table>


        </>
    )
}
