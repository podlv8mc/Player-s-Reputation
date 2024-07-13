import React, { useState } from "react";

function SliderBtn({ currentSlideIndex, handleButtonClick, buttonsData }) {
    const [previousSlideIndex, setPreviousSlideIndex] = useState(null);

    const handleButtonClickWithSave = (index) => {
        setPreviousSlideIndex(currentSlideIndex);
        handleButtonClick(index);
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