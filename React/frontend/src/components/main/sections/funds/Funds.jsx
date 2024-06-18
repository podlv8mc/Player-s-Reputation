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
            category: [0, 1],
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
        },
        {
            category: [0, 2],
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
        },
        {
            category: [0, 3],
            id: uuidv4(),
            src: ImagesFunds.dreamTeam,
            title: "Dream Team",
            content: [
                {
                    title: "Краткое описание преимуществ:",
                    advantages: [
                        "2 человека в группе,",
                        "Можно играть 200 турниров в месяц,",
                        "Моментальные расчеты на сайте,",
                        "Весь рейкбек — игроку,",
                        "Откаты до 70% на фуллбекинге,",
                        "Удобный личный кабинет. Ваша сетка, статистика, сбор фидбэка - все автоматизированно,",
                        "Разбор базы от Beheartless по BeEV+ методике,",
                        "Be-HUD и библиотека ресерчей,",
                        "Курсы повышения квалификации для тренеров,",
                        "Помощь с переездом.",
                    ],
                }
            ],
            alt: "Dream Team",
        },
        {
            category: [0, 4],
            id: uuidv4(),
            src: ImagesFunds.pokerMove,
            title: "Poker Move",
            content: [
                {
                    title: "Хватит следить за успехами других  ─  пора создавать свои!",
                    advantages: [
                        "Команда из успешных играющих тренеров",
                        "Принимаем игроков от ABI 3 до ABI 100",
                        "Высокие откаты для новичков и топов",
                        "Уникальная система \"Грант\": $300 лучшим ученикам PMJunior",
                        "Откаты до 70% на фуллбекинге,",
                        "Короткий контракт на 3000 турниров",
                    ],
                }
            ],
            alt: "Poker Move",
        },
    ];

    const buttonsData = [
        { index: 0, text: "Все" },
        { index: 1, text: "MTT" },
        { index: 2, text: "Кэш-игры" },
        { index: 3, text: "Двухуровневые игры" },
        { index: 4, text: "СНГ" },
    ];

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
        setKey(uuidv4());
    };

    const filteredSlides = useMemo(() => {
        const currentCategory = buttonsData[currentSlideIndex]?.index;
        return slidesData.filter(slide => slide.category.includes(currentCategory) || currentCategory === "Все");
    }, [currentSlideIndex, slidesData, buttonsData]);

    const fundsSlide = useMemo(() => <FundsSlide key={key} slides={filteredSlides} />, [key, filteredSlides]);

    return (
        <section id="funds" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды" subtitle="Список всех бекинговых фондов СНГ." />
            <SliderBtn currentSlideIndex={currentSlideIndex} handleButtonClick={handleButtonClick} buttonsData={buttonsData} />
            {fundsSlide}
        </section>
    );
}

export default Funds;