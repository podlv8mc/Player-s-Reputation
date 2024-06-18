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
            {
                id: uuidv4(),
                src: ImagesFunds.svPoker,
                title: "SV Poker",
                content: [
                    {
                        title: "Наши преимущества:",
                        advantages: [
                            "Bruh1",
                            "Bruh2",
                            "Bruh3"
                        ],
                    }
                ],
                alt: "SV Poker"
            },
            {
                id: uuidv4(),
                src: ImagesFunds.svPoker,
                title: "SV Pokerцйудатцупцутпд",
                content: [
                    {
                        title: "Наши преимущества:",
                        advantages: [
                            "Bruh1",
                            "Bruh2",
                        ],
                    }
                ],
                alt: "SV Poker"
            },
        ],
        [],
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
