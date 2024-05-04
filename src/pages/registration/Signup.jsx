/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import bg_video from '../../assets/bg_video.mp4';

const Signup = () => {
    const context = useContext(myContext);
    const {loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                 SIGN UP FUNCTION AFTER THIS BLOCK
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }

        // Check if the password meets the minimum length requirement
        if (userSignup.password.length < 6 || userSignup.password.length > 8) {
            toast.error("Password must be between 6 and 8 characters long");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                <div className="mb-8">
                    <h2 className='text-center text-3xl font-bold text-yellow-400'>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className='bg-gray-700 text-center border border-gray-600 px-20 py-3 w-full rounded-md outline-none placeholder-gray-500'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-6">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className='bg-gray-700 text-center border border-gray-600 px-20 py-3 w-full rounded-md outline-none placeholder-gray-500'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className='bg-gray-700 border text-center border-gray-600 px-20 py-3 w-full rounded-md outline-none placeholder-gray-500'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-6">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-black-500 border border-white text-white hover:bg-yellow-600 hover:text-black w-full text-center py-3 font-bold rounded-md transition-colors duration-300'
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-gray-300 text-center'>Have an account? <Link className='text-yellow-400 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;
