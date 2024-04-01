import React from "react";

function CustomPaginationDots(props) {
    const { activeIndex, slideCount, onClick } = props;

    const dots = [];
    for (let i = 0; i < slideCount; i++) {
        const isActive = i === activeIndex;
        dots.push(
            <button
                key={i}
                className={`pagination__btn-op ${isActive ? "active" : ""}`}
                onClick={() => onClick(i)}
            >
                {i + 1}
            </button>
        );
    }

    return <div className="pagination__wrap">{dots}</div>;
}

export default CustomPaginationDots;