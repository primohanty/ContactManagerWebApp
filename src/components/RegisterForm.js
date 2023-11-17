import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import { useState } from "react";
const RegisterForm = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm();

    const createUser = async (data) => {
        try{
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/register`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...data }),
                }
            );
          

            if (savedUserResponse.ok) {
                // If the response status is okay, convert it to JSON
                toast.success("User Resgistered");

            } 
            else {
                toast.error("User Registration Failed");
            }
        

        }catch(error){
            console.log("API request error", error);
        }

        
    
        
    };


    return(
        <div>
            <form onSubmit={handleSubmit(createUser)}>
                <div className="flex flex-col gap-3 ">
                    {/* username */}
                    <div>
                        <label 
                            htmlFor="username"
                            className="text-base font-medium text-gray-900">
                            {" "}
                            User Name<sup className="text-red-500">*</sup>
                        </label>

                        <div className="mt-2.5">
                            <input 
                                type="text"
                                className="flex h-10 w-60 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                placeholder="Enter You Full Name"
                                {...register("username")}></input>
                        </div>
                    </div>

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
                                {...register("password")}>
                            </input>
                            {
                                showPassword ? 
                                    <AiFillEye className="text-lg cursor-pointer" onClick={() => setShowPassword(false)} /> : 
                                    <AiFillEyeInvisible className="text-lg cursor-pointer" onClick={() => setShowPassword(true)} />
                            }

                        </div>

                    </div>
                    
                    {/* create user button */}
                    <div className="w-fit p-1 rounded-full mx-auto bg-yellow-300 font-medium">
                        <button 
                            type="submit"
                            className=" p-1 flex items-center justify-center">
                            Create User Account
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

export default RegisterForm
