import React from 'react';
import { Link } from "react-scroll";
import { useSpring, animated } from 'react-spring';

const List = ({ class: className, href, name, alt, spanClass, text, isOpen }) => {
    const contentAnimation = useSpring({
        left: isOpen ? '30' : '45px',
        from: { left: '45px' },
    });

    const textAnimation = useSpring({
        left: isOpen ? '40px' : '-200px',
        from: { left: '-200px' },
    });

    const handleSetActive = (to) => {
    };

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
            >
                <animated.img src={name} alt={alt} style={contentAnimation} />
                <animated.span className={spanClass} style={textAnimation}>
                    {text}
                </animated.span>
            </Link>
        </li>
    )
}

export default List;
