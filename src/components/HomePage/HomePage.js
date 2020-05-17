import React from 'react';
import Carrousel from './Carrousel/Carrousel';
import './HomePage.css';
const HomePage = () => {
    return (
        <div style={{ position: 'relative' }}>
            <Carrousel />
            <div className="bigTitle">
                <div className="bigInside">
                    La Librairie
                </div>
            </div>

        </div>
    );
};

export default HomePage;