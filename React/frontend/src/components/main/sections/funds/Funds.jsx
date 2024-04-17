import React, { useState } from "react";
import Sections from "@/components/headers/Sections";
import FundsSlide from "@/components/main/sections/funds/FundsSlide";
import ImagesFunds from "@/image/funds/imageFunds";

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const slidesData = [
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        // Данные для второго слайда
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        // Данные для третьего слайда
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        // Данные для четвертого слайда
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ]
    ];

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
    };

    return (
        <section id="funds" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды"
                      subtitle="Список всех бекинговых фондов СНГ."/>
            <div className="funds__btn-wrap">
                <button className={`funds__btn ${currentSlideIndex === 0 ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(0)}>
                    Все
                </button>
                <button className={`funds__btn ${currentSlideIndex === 1 ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(1)}>
                    MTT
                </button>
                <button className={`funds__btn ${currentSlideIndex === 2 ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(2)}>
                    Кэш-игры
                </button>
                <button className={`funds__btn ${currentSlideIndex === 3 ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(3)}>
                    Двухуровневые игры
                </button>
                <button className={`funds__btn ${currentSlideIndex === 4 ? "funds__btn-color" : ""}`}
                        onClick={() => handleButtonClick(4)}>
                    СНГ
                </button>
            </div>
            <FundsSlide slides={slidesData[currentSlideIndex]}/>
        </section>
    );
}

export default Funds;