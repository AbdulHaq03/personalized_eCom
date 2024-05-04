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
                    <img src="https://www.hdwallpapers.in/download/apple_laptop_on_table_4k_hd_macbook-3840x2160.jpg" alt="Hero 1" style={imageStyle} />
                </div>
                <div>
                    <img src="https://wallpapercave.com/wp/wp8030597.jpg" alt="Hero 2" style={imageStyle} />
                </div>
            </Slider>
        </div>
    );
}

export default HeroSection;
