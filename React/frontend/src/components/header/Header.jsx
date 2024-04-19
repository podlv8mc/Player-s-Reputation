import React, { useState } from 'react';
import StickyBox from "react-sticky-box";
import Navigation from "@/components/header/Navigation";

const Header = ({ handleModalOpen }) => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setIsButtonClicked(prevState => !prevState);
    };

    return (
        <div className={`header__wrap ${isButtonClicked ? 'header__wrap-width' : ''}`}>
            <StickyBox offsetTop={5} offsetBottom={0}>
                <header className={`header ${isButtonClicked ? 'header-width' : ''}`}>
                    <Navigation onButtonClick={handleButtonClick} handleModalOpen={handleModalOpen}/>
                </header>
            </StickyBox>
        </div>
    );
};

export default Header;
