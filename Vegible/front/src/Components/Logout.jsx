import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    
    const navigate = useNavigate();
    const userlogout = async () => {
        const res = await fetch("/logoutuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        await res.json();
        if (res.status === 200) {
            console.log("Logout Success");
            navigate("/")
        }

        else {
            console.log("Logout Failed");
        }
    }
    useEffect(() => {
        userlogout();
    })

  return (
    <>
      <h1>Logout Success</h1>
    </>
  )
}
