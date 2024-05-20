import React, {useRef} from 'react';
import {Link} from "react-scroll";
import {useSpring, animated} from 'react-spring';
import {NavLink} from "react-router-dom";
import Video from "@/video/video";

const List = ({className, name, alt, spanClass, text, isOpen, onClick, linkTo}) => {
    const contentAnimation = useSpring({
        left: isOpen ? '30' : '45px',
        from: {left: '45px'},
    });

    const textAnimation = useSpring({
        left: isOpen ? '40px' : '65px',
        from: {left: '65px'},
    });

    const videoRef = useRef(null);

    const handleMouseOver = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseOut = () => {
        if (videoRef.current) {
            setTimeout(() => {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }, 100);
        }
    };
    const renderLink = () => {
        if (!linkTo) return null;

        if (linkTo.startsWith('/')) {
            return (
                <NavLink
                    to={linkTo}
                    className="globalnav__link"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    {renderContent()}
                </NavLink>
            );
        } else {
            return (
                <Link
                    className="globalnav__link"
                    to={linkTo}
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={0}
                    onClick={onClick}
                >
                    {renderContent()}
                </Link>
            );
        }
    };

    const renderContent = () => {
        if (className === 'globalnav globalnav-logo') {
            return (
                <>
                    <animated.video
                        ref={videoRef}
                        src={Video.logo.default}
                        muted={true}
                        //loop={true}
                        style={contentAnimation}
                    />
                    <animated.span className={spanClass} style={textAnimation}>
                        {text}
                    </animated.span>
                </>
            );
        } else {
            return (
                <>
                    <animated.img src={name} alt={alt} style={contentAnimation}/>
                    <animated.span className={spanClass} style={textAnimation}>
                        {text}
                    </animated.span>
                </>
            );
        }
    };

    return (
        <li className={className}>
            {renderLink()}
        </li>
    );
}

export default List;