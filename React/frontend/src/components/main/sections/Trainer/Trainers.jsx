import React, { useState } from "react";
import Sections from "@/components/headers/Sections";
import ImagesFunds from "@/image/trainers/imageTrainers";
import TrainersSlide from "@/components/main/sections/Trainer/TrainersSlide";
import imageTrainers from "@/image/trainers/imageTrainers";
import SliderBtn from "@/components/main/sections/funds/SliderBtn";

function Funds() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const slidesData = [
        [
        ],
        [
            { src: imageTrainers.trainerOne, title: "Александр AlexZA3", content: "Успешный регуляр АБИ 200+, сооснователь школы KOT. Выиграл $350K+ за два года, отыграв дорогие МТТ с РОИ более 25%. Часто появляется на оффлайн-сериях", alt: "fundsOne" },
        ],
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
        [
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "Созданная известными профессионалами VeA и STiger, школа покера SV school предлагает качественное обучение МТТ", alt: "fundsOne" },
        ],
        [
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
            { src: imageTrainers.trainerOne, title: "Школа покера SV school", content: "фцулкпрфдупи цуш зцшугпрз    шгцРАЩшаоцшгА   ЦЩГАП   ЦШгпащцшАПигшпшг щшфурпшгпуушцгфпра гШГЗпЗШГУЫПРШЗГЫКПЦУ АЦУГШПАЦУШГАОЦУЩШАРПЦУШГ ЩШ3ЙПАШ2ГЦРПШОПЦШЩ УЦУЩШАРЦУШГИАЦЩШУОАЦШГГАЦ ЩЦУПРДЦШУГПЦУИрыжлип", alt: "fundsOne" },
        ]
    ];

    const initialSlides = slidesData.slice(1).flat();

    const handleButtonClick = (index) => {
        setCurrentSlideIndex(index);
    };

    return (
        <section id="trainers" className="funds__wrap">
            <Sections clarification="ТОП Бекинг Фондов" title="Лучшие тренера по покеру"
                      subtitle="Рейтинг лучших тренеров обучающих игры в Poker"/>
            <SliderBtn currentSlideIndex={currentSlideIndex} handleButtonClick={handleButtonClick} />
            <TrainersSlide slides={currentSlideIndex === 0 ? initialSlides : slidesData[currentSlideIndex]}/>
        </section>
    );
}

export default Funds;