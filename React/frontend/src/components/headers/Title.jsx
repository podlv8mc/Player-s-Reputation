import React, { useState, useEffect } from 'react';
import axios from "axios";

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
        axios.get('http://213-134-31-78.netherlands.vps.ac/api/v1/records', {
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
                Бекинговый фонд
            </h1>
            <p className="title__text">
                Организация, которая предоставляет обучение и финансирование игрокам в покер
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