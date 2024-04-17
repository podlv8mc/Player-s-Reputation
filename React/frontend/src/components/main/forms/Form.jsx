import React, {useEffect, useState} from 'react';
import Images from "@/image/image";
import axios from "axios";

const Form = ({ id }) => {
    const [recommendation, setRecommendation] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showFigure, setShowFigure] = useState(window.innerWidth <= 650);

    useEffect(() => {
        const handleResize = () => {
            setShowFigure(window.innerWidth <= 650);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted!', recommendation, name, email, subject, message);

        axios.post("httpil", {
            user_choice: recommendation,
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <>
            {showFigure && (
                <figure>
                    <img src={Images.popup__background} alt="popup__background"/>
                </figure>
            )}
            <form onSubmit={handleSubmit} className="form">
                <div className="radio__wrap">
                    <label className="radio">
                        <input
                            type="radio"
                            name="recommendation"
                            value="trainer"
                            checked={recommendation === 'trainer'}
                            onChange={(e) => setRecommendation(e.target.value)}
                            autoComplete="off"
                        />
                        <span>
                        </span>
                        <p>
                            Порекомендовать тренера
                        </p>
                    </label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="recommendation"
                            value="fund"
                            checked={recommendation === 'fund'}
                            onChange={(e) => setRecommendation(e.target.value)}
                        />
                        <span>
                        </span>
                        <p>
                            Порекомендовать Фонд
                        </p>
                    </label>
                </div>
                <div className="form__contact">
                    <div className="input__wrap">
                        <input
                            className="input"
                            type="text"
                            required
                            id={`name-${id}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                        />
                        <label htmlFor={`name-${id}`}>Имя</label>
                    </div>
                    <div className="input__wrap">
                        <input
                            className="input"
                            required
                            type="email"
                            id={`email-${id}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />
                        <label htmlFor={`email-${id}`}>Е-мейл</label>
                    </div>
                </div>
                <div className="input__wrap">
                    <input
                        className="input"
                        type="text"
                        required
                        id={`subject-${id}`}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        autoComplete="off"
                    />
                    <label htmlFor={`subject-${id}`}>Тема</label>
                </div>
                <div className="input__wrap">
                    <textarea
                        className="input textarea"
                        required
                        id={`message-${id}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <label htmlFor={`message-${id}`}>Ваше сообщение</label>
                </div>
                <button className="form__btn btn-hover" type="submit">
                    Отправить
                </button>
            </form>
        </>
    );
};

export default Form;