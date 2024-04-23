import React from "react";

function SliderBtn ({ currentSlideIndex, handleButtonClick }) {
    const buttonsData = [
        { index: 0, text: "Все" },
        { index: 1, text: "MTT" },
        { index: 2, text: "Кэш-игры" },
        { index: 3, text: "Двухуровневые игры" },
        { index: 4, text: "СНГ" }
    ];

    return (
        <div className="funds__btn-wrap">
            {buttonsData.map(button => (
                <button key={button.index} className={`funds__btn ${currentSlideIndex === button.index ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(button.index)}>
                    {button.text}
                </button>
            ))}
        </div>
    );
}

export default SliderBtn;