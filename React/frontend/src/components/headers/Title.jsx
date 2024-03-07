import React from 'react';

class Title extends React.Component {
    render() {
        return (
            <div className="title__wrap">
                <h1>
                    Бекинговый фонд
                </h1>
                <p className="title__text">
                    Организация, которая предоставляет обучение и финансирование игрокам в покер
                </p>
                <button type="button" className="title__btn">
                    Войти
                </button>
            </div>
        )
    }
}

export default Title