import React from "react";
import { useNavigate } from "react-router-dom";

// Search Data
const searchData = [
    {
        name: 'Fashion',
        image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?cs=srgb&dl=pexels-solliefoto-298863.jpg&fm=jpg'
    },
    {
        name: 'T-shirts',
        image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg'
    },
    {
        name: 'Jacket',
        image: 'https://leatheriza.com/wp-content/uploads/2023/10/bc2bad088c7bc9eac8607526f14ac098.jpg'
    },
    {
        name: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-3.jpg'
    },
    {
        name: 'Laptops',
        image: 'https://microless.com/cdn/products/96ba66c29918b5c59b6f7593c9f44c25-hi.jpg'
    },
    {
        name: 'Books',
        image: 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg'
    },
];

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-auto lg:justify-center hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {searchData.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div onClick={() => navigate(`/category/${item.name}`)} className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-black-700 transition-all cursor-pointer mb-1 flex justify-center items-center relative overflow:hidden hover:bg-yellow-400">
                                        {/* Image tag  */}
                                        <img src={item.image} alt={item.name} className="rounded-full w-full h-full object-cover" />
                                    {/* Hover effect */}
                                    <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-yellow-400"></div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className='text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase'>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "body { overflow-x: hidden; }" }} />
        </div>
    );
}

export default Category;
