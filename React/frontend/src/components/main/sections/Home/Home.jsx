import React from 'react';
import Title from "@/components/headers/Title";
import Images from "@/image/image";

class Home extends React.Component {
    render() {
        return (
            <section className="home__wrap">
                <figure>
                    <img src={Images.homeBackground} className="firstImage" alt="background"/>
                    <img src={Images.homeBackgroundMobile} className="secondIMage" alt="background"/>
                </figure>
                <Title />
            </section>
        )
    }
}

export default Home