import React, {useRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "@/image/image";

function FundsSlide({slides}) {
    const [expandedSlideIndex, setExpandedSlideIndex] = useState(null);

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };


    const settings = {
        className: "slider__wrap",
        slidesToShow: 3,
        lazyLoad: true,
        rows: 2,
        infinite: false,
        dots: true,
        speed: 500,
        slidesToScroll: 2,
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
        ],
        appendDots: dots => (
            <div className="sgfsr">
                <button className="slide__btn-nav" onClick={previous}>
                    <img src={Images.arrow} alt="arrow"/>
                </button>
                <div className="">
                    {dots}
                </div>
                <button className="slide__btn-nav" onClick={next}>
                    <img src={Images.arrow} alt="arrow"/>
                </button>
            </div>
        ),
        customPaging: i => (
            <div className="slide__pagination">
                {i + 1}
            </div>
        ),
    };

    const toggleClass = (index) => {
        setExpandedSlideIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            <Slider ref={slider => {
                sliderRef = slider;
            }} {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide__wrap">
                        <div className={`slide ${expandedSlideIndex === index ? 'slide__height' : ''}`}>
                            <figure className="slide__image">
                                <img src={slide.src} alt={slide.alt}/>
                            </figure>
                            <div className="slide__text-wrap">
                                <div className="slide__text-title">
                                    {slide.title}
                                </div>
                                <div className="slide__text">
                                    {slide.content}
                                </div>
                            </div>
                            <button className={`slide__btn ${expandedSlideIndex === index ? 'expanded' : ''}`}
                                    onClick={() => toggleClass(index)}>
                                {expandedSlideIndex === index ? "Скрыть" : "Читать больше"}
                                <svg width="14" height="8" viewBox="0 0 16 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M15.5694 0.51192C15.839 0.826414 15.8026 1.29989 15.4881 1.56946L8.48808 7.56946C8.20721 7.8102 7.79276 7.8102 7.51189 7.56946L0.511893 1.56946C0.197399 1.29989 0.160977 0.826414 0.430544 0.511919C0.70011 0.197425 1.17359 0.161004 1.48808 0.430571L7.99999 6.01221L14.5119 0.430571C14.8264 0.161005 15.2999 0.197426 15.5694 0.51192Z"
                                          fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>

        </>
    );
}

export default FundsSlide;