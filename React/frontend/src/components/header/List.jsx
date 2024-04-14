import React from 'react';
import { Link } from "react-scroll";
import { useSpring, animated } from 'react-spring';
import {NavLink} from "react-router-dom";

const List = ({ class: className, href, name, alt, spanClass, text, isOpen, onClick, logoLink, tableLink }) => {
    const contentAnimation = useSpring({
        left: isOpen ? '30' : '45px',
        from: { left: '45px' },
    });

    const textAnimation = useSpring({
        left: isOpen ? '40px' : '65px',
        from: { left: '65px' },
    });

    const handleSetActive = (to) => {
    };

    if (logoLink) {
        return (
            <li className={className}>
                <NavLink to="/" className="globalnav__link">
                    <animated.img src={name} alt={alt} style={contentAnimation}/>
                    <animated.span className={spanClass} style={textAnimation}>
                        {text}
                    </animated.span>
                </NavLink>
            </li>
        );
    }

    if (tableLink) {
        return (
            <li className={className}>
                <NavLink to="/table" className="globalnav__link">
                    <animated.img src={name} alt={alt} style={contentAnimation}/>
                    <animated.span className={spanClass} style={textAnimation}>
                        {text}
                    </animated.span>
                </NavLink>
            </li>
        );
    }

    return (
        <li className={className}>
            <Link
                className="globalnav__link"
                to={href}
                spy={true}
                smooth={true}
                offset={0}
                duration={0}
                onSetActive={handleSetActive}
                onClick={onClick}
            >
                <animated.img src={name} alt={alt} style={contentAnimation} />
                <animated.span className={spanClass} style={textAnimation}>
                    {text}
                </animated.span>
            </Link>
        </li>
    );
}

export default List;