/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import bg_video from '../../assets/bg_video.mp4';

const Login = () => {

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                  Login Function After this Block
    *========================================================================**/

    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-gray-900'>
            {loading && <Loader />}
            {/* Video Background  */}
            <video autoPlay loop muted className="absolute inset-0 z-0 object-cover w-full h-full z-0">
                <source src={bg_video} type="video/mp4" />
            </video>

            {/* Login Form  */}
            <div className="login_Form bg-gray-800 px-8 py-6 border border-gray-700 rounded-xl shadow-md z-10">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-3xl font-bold text-yellow-400'>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}
                        className='bg-gray-700 text-center border border-gray-600 px-20 py-3 w-full rounded-md outline-none placeholder-gray-500'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}
                        className='bg-gray-700 text-center border border-gray-600 px-20 py-3 w-full rounded-md outline-none placeholder-gray-500'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-6">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-black-500 border border-white text-white hover:bg-yellow-600 hover:text-black w-full text-center py-3 font-bold rounded-md transition-colors duration-300'
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-gray-300 text-center'>Don't have an account? <Link className='text-yellow-400 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;
