import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "@/image/image";

function TrainersSlide ({ slides }) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [expandedSlideIndex, setExpandedSlideIndex] = useState(null);
    const sliderRef = useRef(null);

    const updateActiveSlideIndex = (index) => {
        setActiveSlideIndex(index);
    };

    const toggleClass = (index) => {
        setExpandedSlideIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        className: "slider__wrap",
        slidesToShow: 3,
        lazyLoad: true,
        rows: 2,
        infinite: false,
        dots: true,
        speed: 500,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    rows: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    rows: 1,
                }
            },
        ],
        appendDots: (dots) => (
            <div className="">
                <button className="slide__btn-nav" onClick={previous}>
                    <img src={Images.arrow} alt="arrow" />
                </button>
                <div className="">{dots}</div>
                <button className="slide__btn-nav" onClick={next}>
                    <img src={Images.arrow} alt="arrow" />
                </button>
            </div>
        ),
        customPaging: (i) => (
            <div className={`slide__pagination ${i === activeSlideIndex ? "slide__pagination-active" : ""}`}>
                {i + 1}
            </div>
        ),
        beforeChange: (oldIndex, newIndex) => {
            updateActiveSlideIndex(newIndex);
        },
    };

    return (
        <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
                <div key={slide.id} id={slide.id} className="slide__wrap">
                    <div className={`slide slide-trainer ${expandedSlideIndex === index ? "slide__height" : ""}`}>
                        <figure className="slide__image">
                            <img src={slide.src} alt={slide.alt} />
                        </figure>
                        <div className="slide-trainer-wrap">
                            <div className="slide__text-wrap">
                                <div className="slide__text-title">{slide.title}</div>
                                <div className="slide__text">{slide.content}</div>
                            </div>
                            <button
                                className={`slide__btn ${expandedSlideIndex === index ? "expanded" : ""}`}
                                onClick={() => toggleClass(index)}
                            >
                                {expandedSlideIndex === index ? "Скрыть" : "Читать больше"}
                                <svg width="14" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5694 0.51192C15.839 0.826414 15.8026 1.29989 15.4881 1.56946L8.48808 7.56946C8.20721 7.8102 7.79276 7.8102 7.51189 7.56946L0.511893 1.56946C0.197399 1.29989 0.160977 0.826414 0.430544 0.511919C0.70011 0.197425 1.17359 0.161004 1.48808 0.430571L7.99999 6.01221L14.5119 0.430571C14.8264 0.161005 15.2999 0.197426 15.5694 0.51192Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default TrainersSlide;