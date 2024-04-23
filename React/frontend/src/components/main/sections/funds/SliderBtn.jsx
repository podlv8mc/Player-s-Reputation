import React, { useState } from "react";

function SliderBtn ({ currentSlideIndex, handleButtonClick }) {
    const buttonsData = [
        { index: 0, text: "MTT" },
        { index: 1, text: "Кэш-игры" },
        { index: 2, text: "Двухуровневые игры" },
        { index: 3, text: "СНГ" }
    ];

    const [previousSlideIndex, setPreviousSlideIndex] = useState(null); // Состояние для хранения предыдущего индекса слайда

    const handleButtonClickWithSave = (index) => {
        setPreviousSlideIndex(currentSlideIndex); // Сохраняем текущий индекс перед изменением
        handleButtonClick(index); // Вызываем функцию для изменения слайдов
    };

    return (
        <div className="funds__btn-wrap">
            {buttonsData.map(button => (
                <button
                    key={button.index}
                    className={`funds__btn ${currentSlideIndex === button.index ? "funds__btn-color" : ""}`}
                    onClick={() => handleButtonClickWithSave(button.index)}>
                    {button.text}
                </button>
            ))}
        </div>
    );
}

export default SliderBtn;
