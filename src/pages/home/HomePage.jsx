import { useContext } from "react";

import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import HomePagePCard from "../../components/homePagePCard/HomePagePCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import myContext from "../../context/myContext";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <HomePagePCard/>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;