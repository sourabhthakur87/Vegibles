import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function OneSellerData() {
    // const navigate = useNavigate()
    const { id } = useParams()
        const [onesellerData,setOnesellerData] = useState("");
        const [oneSellervaggi,setOneSellerVaggi] = useState([])

    const oneseller = async (id) => {
        try {
            const res = await fetch("/onesellerData/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setOnesellerData(data)
            setOneSellerVaggi(data.vegitables)
            // console.log(oneSellervaggi);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        oneseller(id);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <h1>One Seller Data</h1>
            <h1>{onesellerData.userName}</h1>
            
            <h1>-------------------------------------------------</h1>
            <table border="2px">
                <tr>
                    <th>SNO.</th>
                    <th>Vegitable</th>
                </tr>

                {
                    oneSellervaggi.map((curr, index) => {
                        return (
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{curr.Vagilist}</td>
                                </tr>
                            </>
                        )
                    })
                }

            </table>
        </>
    )
}
