import React, { useState, useEffect } from 'react';
import domain from "@/domain";
import axios from 'axios';

const AdminWrapper = ({ children }) => {
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.get(`${domain}users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                setRole(response.data.role);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {role === "admin" && children}
        </>
    );
};

export default AdminWrapper;