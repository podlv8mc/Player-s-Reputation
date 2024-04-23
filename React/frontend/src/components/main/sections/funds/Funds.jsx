import React, { useState } from "react";
import Sections from "@/components/headers/Sections";
import FundsSlide from "@/components/main/sections/funds/FundsSlide";
import ImagesFunds from "@/image/funds/imageFunds";
import SliderBtn from "@/components/main/sections/funds/SliderBtn"
import { v4 as uuidv4 } from 'uuid';

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const slidesData = [
        [
        ],
        [
            { src: ImagesFunds.fundOne, title: "1", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        [
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Охуеть", alt: "fundsOne" },
        ]
    ];
    const slidesWithId = slidesData.map(subarray => subarray.map(slide => ({ ...slide, id: uuidv4() })));

    const initialSlides = slidesWithId.slice(1).flat();


    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
    };

    return (
        <section id="funds" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды"
                      subtitle="Список всех бекинговых фондов СНГ."/>
            <SliderBtn currentSlideIndex={currentSlideIndex} handleButtonClick={handleButtonClick} />
            <FundsSlide slides={currentSlideIndex === 0 ? initialSlides : slidesWithId[currentSlideIndex]}/>
        </section>
    );
}

export default Funds;