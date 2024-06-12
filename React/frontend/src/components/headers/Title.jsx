import React, { useState, useEffect } from 'react';
import axios from "axios";
import domain from "@/domain";

const Title = ({handleModalOpen}) => {
    const [bodyClass, setBodyClass] = useState('');
    const [authorization, setAuthorization] = useState(false);

    useEffect(() => {
        if (bodyClass) {
            document.body.classList.add(bodyClass);
        }

        return () => {
            if (bodyClass) {
                document.body.classList.remove(bodyClass);
            }
        };
    }, [bodyClass]);

    useEffect(() => {
        axios.get(`${domain}records`, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(() => {
            setAuthorization(true);
        }).catch(() => {
            setAuthorization(false);
        });
    }, []);

    return (
        <div className="title__wrap">
            <h1>
                Player’s Reputation
            </h1>
            <p className="title__text">
            </p>

            {
                !authorization && (
                    <>
                        <button onClick={handleModalOpen} type="button" className="btn-hover title__btn">
                            Войти
                        </button>
                    </>
                )
            }
        </div>
    );
};

export default Title;