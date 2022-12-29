import React from 'react';
import Sidebar from './Sidebar';
import Files from "./Files";
import Footer from "./Footer";
import Header from "./Header";
function Home() {
    return (
        <>
            <Header />
            <div className="center text-center">
                <div className="content mt-3" >
                    <h1>List Files</h1>
                    <Files/>
                </div>
                <Sidebar/>
            </div>
            <Footer />
        </>
    );
}
export default Home;