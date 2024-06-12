import React, { Suspense } from 'react';
import Home from "@/components/main/sections/Home/Home";
import About from "@/components/main/sections/About/About";
import Contacts from "@/components/main/sections/Contacts/Contacts";
import Footer from "@/components/footer/Footer";


const Funds = React.lazy(() => import("@/components/main/sections/funds/Funds"));

const Trainers = React.lazy(() => import("@/components/main/sections/Trainer/Trainers"));

class Main extends React.Component {
    render() {
        const {handleModalOpen} =this.props;
        return (
            <main id="main" className="main">
                <Home handleModalOpen={handleModalOpen}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Funds />
                </Suspense>
                {/*<Suspense fallback={<div>Loading...</div>}>
                    <Trainers />
                </Suspense>
                <About />
                <Contacts />
                <Footer />
                */}
            </main>
        )
    }
}

export default Main