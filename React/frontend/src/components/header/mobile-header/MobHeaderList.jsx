import React from 'react';
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

const MobHeaderList = ({ className, name, alt, spanClass, text, onClick, linkTo }) => {


    const renderLink = () => {
        if (!linkTo) return null;

        if (linkTo.startsWith('/')) {
            return (
                <NavLink to={linkTo} className="globalnav__link">
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

    const renderContent = () => (
        <>
            <img src={name} alt={alt} />
            <span className={spanClass}>
                {text}
            </span>
        </>
    );

    return (
        <li className={className}>
            {renderLink()}
        </li>
    );
}

export default MobHeaderList;