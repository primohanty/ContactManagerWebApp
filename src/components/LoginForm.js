import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import { setToken } from "../redux/slices/authSlice";
import { useState } from "react";

const LoginForm = () => {
    
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Store the useNavigate function in a variable
    
    const checkUser = async (data) => {
        console.log(data);
        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
        
                    },
                    body: JSON.stringify({ ...data }),
                }
                
            );
            

            
            

            if (savedUserResponse.ok) {

                toast.success("User Logged In");
                const response = await savedUserResponse.json();
                dispatch(setToken(response.token));
                sessionStorage.setItem("token", JSON.stringify(response.token));
                navigate("/home"); // Use the navigate function to go to the desired route

            } else {
                toast.error("User Login Failed");
            }
        } catch (error) {
            console.log("API request error while login",error);
        }

    };
    

    return(
        <div>
            <form onSubmit={handleSubmit(checkUser)}>
                <div className="flex flex-col gap-3 ">

                    {/* email */}
                    <div>
                        <label 
                            htmlFor="email"
                            className="text-base font-medium text-gray-900">
                            {" "}
                            Email ID<sup className="text-red-500">*</sup>
                        </label>
                        
                        <div className="mt-2.5">
                            <input 
                                type="email"
                                className="flex h-10 w-60 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                placeholder="Enter Your Email"
                                {...register("email")} 
                                ></input>
                        </div>
                    </div>

                    {/* password */}
                    <div>

                        <label 
                            htmlFor="password"
                            className="text-base font-medium text-gray-900">
                            {" "}
                            Password<sup className="text-red-500">*</sup>
                        </label>

                        <div className="mt-2.5 flex items-center gap-x-2">
                            <input 
                                type={showPassword ? "text" : "password"}
                                className="flex h-10 w-60 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                placeholder="Enter Your Password"
                                {...register("password")}
                                
                            />
                            {
                                showPassword ? 
                                    <AiFillEye className="text-lg cursor-pointer" onClick={() => setShowPassword(false)} /> : 
                                    <AiFillEyeInvisible className="text-lg cursor-pointer" onClick={() => setShowPassword(true)} />
                            }
                            
                        </div>


                    </div>

                    {/* user login button */}
                    <div className="w-fit p-1 rounded-full mx-auto bg-yellow-300 font-medium">
                        <button  
                            className=" p-1 flex items-center justify-center" 
                            type="submit">
                            <span>Login</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="ml-2 h-4 w-4"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />

                            </svg>
                        </button>
                     
                    </div>

                </div>
                
            </form>
        </div>
    )
}

export default LoginForm
