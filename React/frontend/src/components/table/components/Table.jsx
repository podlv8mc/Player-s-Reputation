import React, {useEffect, useState} from 'react';

function Table({apiLink, columns, inputLabels, newUserData, setNewUserData }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    console.log(inputLabels)
    console.log(newUserData)
    console.log(setNewUserData)




    //===----- Columns -----===//



    у



    //===----- / Columns -----===//

    //===----- Inputs -----===//
    //===----- / Inputs -----===//

    //===----- Resize -----===//



    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };



    //===----- / Resize -----===//

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