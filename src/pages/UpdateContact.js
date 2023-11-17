import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {FaBackward} from "react-icons/fa"

const UpdateContact = () =>{
    const {id} = useParams(); 
    const token = useSelector((state) => state.auth.token);
    const { register, handleSubmit } = useForm();
    // const navigate = useNavigate();
    const getContactData = async () =>{
        try{
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/contacts/${id}`,
                {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                }
            );
            
        }catch(error){
            console("Contact data could not be fetched", error);
        }
    }

    const updateContact = async (data) => {

        try{

            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/contacts/${id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...data }),
                }
            );

            if(savedUserResponse.ok){
                toast.success("Contact Updated");
            }
            else{
                toast.error("Contact Updation Failed");
            }
        
        }catch(error){
            console.log("API Error in while creating new contact", error);
            
        }
    }
    return(
        <div className="flex flex-col w-[400px] items-center mx-auto h-[100vh] justify-center">
                <form onSubmit={handleSubmit(updateContact)}>
                <div className="flex flex-col gap-3 ">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Update Your Contact
                        </h2>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                            <NavLink
                                to={"/home"}
                                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
                            >
                                <FaBackward />
                                Back to All Contacts 
                            </NavLink>
                        </p>
                        
                        {/* username */}
                        <div>
                            <label 
                                htmlFor="name"
                                className="text-base font-medium text-gray-900">
                                {" "}
                                Name<sup className="text-red-500">*</sup>
                            </label>

                            <div className="mt-2.5">
                                <input 
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                    placeholder="Enter the Name"
                                    {...register("name")}></input>
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
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                    placeholder="Enter the Email ID"
                                    {...register("email")} 
                                    ></input>
                            </div>
                        </div>

                        {/* phone*/}
                        <div>

                            <label 
                                htmlFor="phone"
                                className="text-base font-medium text-gray-900">
                                {" "}
                                Phone<sup className="text-red-500">*</sup>
                            </label>

                            <div className="mt-2.5">

                                <input 
                                    type="tel"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                    placeholder="Enter the Phone number"
                                    {...register("phone")}>
                                </input>

                            </div>

                        </div>
                        
                        {/* create user button */}
                        <div className="flex gap-x-6">
                            <div className="w-fit p-1 rounded-full mx-auto bg-yellow-300 font-medium">
                                <button 
                                    type="submit"
                                    className=" p-1 flex items-center justify-center">
                                        Update Contact
                                    
                                </button>
                            </div>
                            
                        </div>
                        

                    </div>
            </form>
        </div>
        
    )
}

export default UpdateContact
