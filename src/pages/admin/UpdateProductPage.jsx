import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router";
import Loader from "../../components/loader/Loader";
import bg_video from '../../assets/bg_video.mp4';

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    },
    {
        name: 'apple Laptops'
    },
]

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    // navigate 
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            //   console.log(product.data())
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const gotToAdminPage=()=>{
        navigate("/admin-dashboard");
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', id), product)
            toast.success("Product Updated successfully")
            getAllProductFunction();
            setLoading(false)
            navigate('/admin-dashboard')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleProductFunction();
    }, []);
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            {/* Video Background  */}
            <video autoPlay loop muted className="absolute inset-0 z-0 object-cover w-full h-full z-0">
                <source src={bg_video} type="video/mp4" />
            </video>
            {loading && <Loader />}
            <div className="login_Form bg-gray-800 px-8 py-6 border border-gray-700 rounded-xl shadow-md z-10">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-bold text-gray-300">Update Product</h2>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="bg-gray-700 border text-gray-300 border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="bg-gray-700 border text-gray-300 border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl}
                        onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                        placeholder="Product Image Url"
                        className="bg-gray-700 border text-gray-300 border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
                    />
                </div>
                <div className="mb-3">
                    <select
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-1 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md outline-none"
                    >
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        name="description"
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-2 py-1 text-gray-300 bg-gray-700 border border-gray-600 rounded-md outline-none placeholder-gray-500"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="bg-gray-900 hover:bg-yellow-800 hover:text-black w-full text-white text-center py-2 font-bold rounded-md"
                    >
                        Update Product
                    </button>
                    <button
                        onClick={() => gotToAdminPage()}
                        type='button'
                        className="bg-gray-900 hover:bg-yellow-800 hover:text-black w-full text-white text-center py-2 font-bold rounded-md mt-5"
                    > Go Back to Admin Page</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;