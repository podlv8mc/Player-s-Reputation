import React, { useState, useMemo } from "react";
import Sections from "@/components/headers/Sections";
import FundsSlide from "@/components/main/sections/funds/FundsSlide";
import ImagesFunds from "@/image/funds/imageFunds";
import SliderBtn from "@/components/main/sections/funds/SliderBtn";
import { v4 as uuidv4 } from 'uuid';

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [key, setKey] = useState(uuidv4());

    const slidesData = [
        {
            id: uuidv4(),
            src: ImagesFunds.svPoker,
            title: "SV Poker",
            content: [
                {
                    title: "Наши преимущества:",
                    advantages: [
                        "Бекинг с долей в профите до 90% ",
                        "Рейкбэк и бонусы игроку (кроме билетов на МТТ)",
                        "IT-платформа для быстрой аналитики и работы над игрой",
                        "Никаких отчетов",
                        "Программа психологической подготовки",
                        "Отсутствие дистанции",
                    ],
                }
            ],
            alt: "SV Poker",
            category: ["Все", "MTT"],
        },
        {
            id: uuidv4(),
            src: ImagesFunds.luckerTeam,
            title: "LuckerTeam",
            content: [
                {
                    title: "LuckerTeam лучший старт покерной карьеры",
                    advantages: [
                        "Мы специализируемся на быстром росте игрока от новичка до крепкого регуляра ABI 15+",
                        "Откаты до 70/30 на полном бэкинге!",
                        "Дружный и позитивный коллектив",
                        "Простейшая форма отчетности",
                        "Низкие начальные требования",
                    ],
                }
            ],
            alt: "LuckerTeam",
            category: ["MTT"],
        },
    ];

    const buttonsData = [
        { index: 0, text: "Все" },
        { index: 1, text: "MTT" },
    ];

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
        setKey(uuidv4());
    };

    const filteredSlides = useMemo(() => {
        const currentCategory = buttonsData[currentSlideIndex]?.text;
        return slidesData.filter(slide => slide.category.includes(currentCategory) || currentCategory === "Все");
    }, [currentSlideIndex, slidesData, buttonsData]);

    const fundsSlide = useMemo(() => <FundsSlide key={key} slides={filteredSlides} />, [key, filteredSlides]);

    return (
        <section id="funds" className="funds__wrap hidden">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды" subtitle="Список всех бекинговых фондов СНГ." />
            <SliderBtn currentSlideIndex={currentSlideIndex} handleButtonClick={handleButtonClick} buttonsData={buttonsData} />
            {fundsSlide}
        </section>
    );
}

export default Funds;