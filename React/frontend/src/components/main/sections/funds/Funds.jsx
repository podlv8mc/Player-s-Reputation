import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sections from "@/components/headers/Sections";

function Funds() {
    const settings = {
        className: "slider__wrap",
        slidesToShow: 3,
        lazyLoad: true,
        rows: 2,
        dots: true,
        speed: 500,
        slidesToScroll: 2,
        appendDots: dots => (
            <div
                style={{
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                    padding: "10px"
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "30px",
                    color: "blue",
                    border: "1px blue solid"
                }}
            >
                {i + 1}
            </div>
        ),
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    rows: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    rows: 3,
                }
            },
        ]

    };

    const toggleClass = (event) => {
        const parentElement = event.target.parentNode;

        parentElement.classList.toggle("qwer");
    };

    return (
        <section id="funds" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды"
                      subtitle="Список всех бекинговых фондов СНГ."/>
            <Slider {...settings}>
                <div className="slide__wrap">
                    <div className="slide">
                        lol
                        <button onClick={toggleClass}>
                            ok
                        </button>
                    </div>
                </div>
            </Slider>
        </section>
    );
}

export default Funds;