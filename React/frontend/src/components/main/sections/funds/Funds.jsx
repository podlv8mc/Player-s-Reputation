import React, {useState, useMemo} from "react";
import Sections from "@/components/headers/Sections";
import FundsSlide from "@/components/main/sections/funds/FundsSlide";
import ImagesFunds from "@/image/funds/imageFunds";
import SliderBtn from "@/components/main/sections/funds/SliderBtn";
import {v4 as uuidv4} from 'uuid';

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [key, setKey] = useState(uuidv4());

    const slidesData = [
        [
            {id: uuidv4(), src: ImagesFunds.fundOne, title: "Школа покера SV school", content: "Все", alt: "fundsOne"},
            {
                id: uuidv4(),
                src: ImagesFunds.svPoker,
                title: "SV Poker",
                content: `Наши преимущества: <ul><li>Бекинг с долей в профите до 90% (Подробности: <a href="https://svschool.pro/loyalty">ссылка</a>)</li><li>Рейкбэк и бонусы игроку (кроме билетов на МТТ)</li><li>IT-платформа для быстрой аналитики и работы над игрой</li><li>Никаких отчетов</li><li>Программа психологической подготовки</li><li>Отсутствие дистанции</li>`,
                alt: "SV Poker"
            },
        ],
        [
            {
                id: uuidv4(),
                src: ImagesFunds.fundOne,
                title: "Школа покера SV school",
                content: "Созданная известными профессионалами VeA и STiger, школа покера Swerf;iqwhefpigquehgfoapeqi nhqmict4jhqwoutchqnwcthmxqw4uchcumctbhqnw4tgbcquytgb13yctugq34u4yrb2qi34grb3uqcy4rbciug4bouy3v4cbt3iu4wcgu3cbgi34tjco14mo3isntiu35cbiuebqenqq;enrjkgtbwnrtbweriutnjeogjtewiupthweiutw4piuybw4ignetgbiv 3wuqbhwf;nae;ujghbweuitghn epiuthqpeiu4thqipu4ethgqiugthq4iu tgvV school предлагает качественное обучение МТТ",
                alt: "fundsOne"
            },
        ],
        [
            {
                id: uuidv4(),
                src: ImagesFunds.fundOne,
                title: "Школа покера SV school",
                content: "Созданная известными 34tri3uhtw hgt3iuth3i4ut3 3iuthiuth3t i3ut34t34ht 334ituh3 4tiph3t3ihteirwuhg eig eriutgheriutgherigriogw ieug weoigeoitgh eiugtweiorrg qeitg qeirtg qet geqrtgqeriugt qeigtqeipughq3ieu gqeiuoghqiutg q34iutg qg3профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ",
                alt: "fundsOne"
            },
        ],
        [
            {
                id: uuidv4(),
                src: ImagesFunds.fundOne,
                title: "Школа покера SV school",
                content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ",
                alt: "fundsOne"
            },
            {
                id: uuidv4(),
                src: ImagesFunds.fundOne,
                title: "Школа покера SV school",
                content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ",
                alt: "fundsOne"
            },
        ],
        [
            {
                id: uuidv4(),
                src: ImagesFunds.fundOne,
                title: "Школа покера SV school",
                content: uuidv4(),
                alt: "fundsOne"
            },
        ]
    ];

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
        setKey(uuidv4());
    };

    const fundsSlide = useMemo(() => <FundsSlide key={key}
                                                 slides={slidesData[currentSlideIndex]}/>, [key, currentSlideIndex, slidesData]);

    return (
        <section id="funds" className="funds__wrap hidden">
            <Sections clarification="ТОП Бекинг Фондов" title="Бекинговые фонды"
                      subtitle="Список всех бекинговых фондов СНГ."/>
            <SliderBtn currentSlideIndex={currentSlideIndex} handleButtonClick={handleButtonClick}/>
            {fundsSlide}
        </section>
    );
}

export default Funds;
