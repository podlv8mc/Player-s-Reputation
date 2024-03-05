import React from 'react';

const Navigation = ({ isToggled, toggleClass }) => {
    return (
        <>
            <nav className="nav__wrap">
                <ul className="nav">
                    <li></li>
                </ul>
            </nav>
            <button className="header__btn" onClick={toggleClass}>
            </button>
        </>
    );
}

export default Navigation;