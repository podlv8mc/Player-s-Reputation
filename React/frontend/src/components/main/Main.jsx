import React, { Suspense } from 'react';
import Footer from "@/components/footer/Footer";
import Home from "@/components/main/sections/Home/Home";
import About from "@/components/main/sections/About/About";
import Contacts from "@/components/main/sections/Contacts/Contacts";


const Funds = React.lazy(() => import("@/components/main/sections/funds/Funds"));

class Main extends React.Component {
    render() {
        return (
            <main id="main" className="main">
                <Home />
                <About />
                <Contacts />
                <Suspense fallback={<div>Loading...</div>}>
                    <Funds />
                </Suspense>
                <Footer />
            </main>
        )
    }
}

export default Main