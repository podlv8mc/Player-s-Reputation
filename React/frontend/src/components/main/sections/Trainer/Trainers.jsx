import React, { useState } from "react";
import Sections from "@/components/headers/Sections";
import ImagesFunds from "@/image/trainers/imageTrainers";
import TrainersSlide from "@/components/main/sections/Trainer/TrainersSlide";
import imageTrainers from "@/image/trainers/imageTrainers";

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const slidesData = [
        // Данные для первого слайда
        [
            { src: imageTrainers.trainerOne, title: "Александр AlexZA3", content: "Успешный регуляр АБИ 200+, сооснователь школы KOT. Выиграл $350K+ за два года, отыграв дорогие МТТ с РОИ более 25%. Часто появляется на оффлайн-сериях", alt: "fundsOne" },
        ],
        // Данные для второго слайда
        [
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        // Данные для третьего слайда
        [
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        // Данные для четвертого слайда
        [
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
        ]
    ];

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
    };

    return (
        <section id="trainers" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Лучшие тренера по покеру"
                      subtitle="Рейтинг лучших тренеров обучающих игры в Poker"/>
            <div className="funds__btn-wrap">
                <button className={`funds__btn ${currentSlideIndex === 0 ? "funds__btn-color" : ""}`} onClick={() => handleButtonClick(0)}>
                    MTT
                </button>
                <button className={`funds__btn ${currentSlideIndex === 1 ? "funds__btn-color" : ""}`} onClick={() => handleButtonClick(1)}>
                    Кэш-игры
                </button>
                <button className={`funds__btn ${currentSlideIndex === 2 ? "funds__btn-color" : ""}`} onClick={() => handleButtonClick(2)}>
                    Двухуровневые игры
                </button>
                <button className={`funds__btn ${currentSlideIndex === 3 ? "funds__btn-color" : ""}`} onClick={() => handleButtonClick(3)}>
                    СНГ
                </button>
            </div>
            <TrainersSlide slides={slidesData[currentSlideIndex]} />
        </section>
    );
}

export default Funds;