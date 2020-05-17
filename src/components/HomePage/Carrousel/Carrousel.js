import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide_one from '../../../assets/images/image1.jpg'
import slide_two from '../../../assets/images/image1.jpg'
import slide_three from '../../../assets/images/image3.jpg'


const Carrousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 800
    }
    return (
        <div
            className="carrousel_wrapper"
            style={{
                height: `${window.innerHeight -120}px`,
                overflow: 'hidden'
            }}
        >
            <Slider {...settings}>
                <div>
                    <div className="carrousel_image"
                        style={{
                            background: `url(${slide_one})`,
                            height: `${window.innerHeight - 120}px`,
                        }}></div>
                </div>
                <div>
                    <div className="carrousel_image"
                        style={{
                            background: `url(${slide_two})`,
                            height: `${window.innerHeight - 120}px`,
                        }}></div>
                </div>
                <div>
                    <div className="carrousel_image"
                        style={{
                            background: `url(${slide_three})`,
                            height: `${window.innerHeight - 120}px`,
                        }}></div>
                </div>
            </Slider>
        </div>
    );
};

export default Carrousel;