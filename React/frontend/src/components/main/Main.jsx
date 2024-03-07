import React from 'react';
import Footer from "@/components/footer/Footer";
import Home from "@/components/main/sections/Home/Home";
import About from "@/components/main/sections/About/About";

class Main extends React.Component {
    render() {
        return (
            <main className="main">
                <Home />
                <About />
                <Footer />
            </main>
        )
    }
}

export default Main