import React, {useEffect, useState} from 'react';

function Table({apiLink, }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    console.log(apiLink);

    return (
        <>
            {windowWidth >= 800 ? (
                <h1 className="">
                    1
                </h1>
            ) : (
                <h1 className="">
                    2
                </h1>
            )}
        </>
    );
}

export default Table;