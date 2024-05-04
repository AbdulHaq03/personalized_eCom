import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = () => {
    const [sliderHeight, setSliderHeight] = useState(0);

    useEffect(() => {
        const calculateSliderHeight = () => {
            const screenHeight = window.innerHeight;
            const desiredImageHeight = screenHeight * 0.68; // 70% of screen height
            console.log("The height is: ", desiredImageHeight);
            console.log("The width is: ",window.innerWidth);
            setSliderHeight(desiredImageHeight);
        };

        // Call the function once initially and add an event listener to recalculate the height on window resize
        calculateSliderHeight();
        window.addEventListener('resize', calculateSliderHeight);

        return () => {
            window.removeEventListener('resize', calculateSliderHeight);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    const imageStyle = {
        width: '100%', 
        height: `${sliderHeight}px`, // Set the height dynamically
        objectFit: 'cover',
        overflow: 'hidden'
    };

    return (
        <div className="overflow-hidden">
            <Slider {...settings} style={{ height: sliderHeight }}>
                <div>
                    <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero 1" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_2.jpg" alt="Hero 2" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_3.jpg" alt="Hero 3" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_4.jpg" alt="Hero 4" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_5.jpg" alt="Hero 5" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_6.jpg" alt="Hero 6" style={imageStyle} />
                </div>
                <div>
                    <img src="src/img/hero_7.jpg" alt="Hero 7" style={imageStyle} />
                </div>
            </Slider>
        </div>
    );
}

export default HeroSection;
