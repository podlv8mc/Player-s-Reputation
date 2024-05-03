import React from 'react';
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

const MobHeaderList = ({ className, name, alt, text, onClick, linkTo }) => {


    const renderLink = () => {
        if (!linkTo) return null;

        if (linkTo.startsWith('/')) {
            return (
                <NavLink to={linkTo} className="mob-header-link">
                    {renderContent()}
                </NavLink>
            );
        } else {
            return (
                <Link
                    className="mob-header-link"
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
            <p>
                {text}
            </p>
        </>
    );

    return (
        <li className={className}>
            {renderLink()}
        </li>
    );
}

export default MobHeaderList;