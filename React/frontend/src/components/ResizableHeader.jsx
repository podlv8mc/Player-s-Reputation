import React, { useEffect, useState } from 'react';
import Header from "@/components/header/Header";
import MobHeader from "@/components/header/mobile-header/MobHeader";

const ResizableHeader = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 801 ? (
                <Header/>
            ) : (
                <MobHeader />
            )}
        </>
    );
}

export default ResizableHeader;