import React from 'react';
import Footer from "@/components/footer/Footer";
import Home from "@/components/main/sections/Home/Home";
import About from "@/components/main/sections/About/About";
import Contacts from "@/components/main/sections/Contacts/Contacts";

class Main extends React.Component {
    render() {
        return (
            <main id="main" className="main">
                <Home />
                <About />
                <Contacts />
                <Footer />
            </main>
        )
    }
}

export default Main