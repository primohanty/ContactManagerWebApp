import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";


const ContactForm = () => {
    const token = useSelector((state) => state.auth.token);
    const { register, handleSubmit } = useForm();
    // const navigate = useNavigate();

    const createContact = async (data) => {
        try{
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/contacts/`,
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...data }),
                }
            );

            if(savedUserResponse.ok){
                toast.success("New Contact Created");
            }
        }catch(error){
            console.log("API Error in while creating new contact", error);
            toast.error("New Contact creation failed");
        }
        

        

    
  };
    return(
        <div>
            <form onSubmit={handleSubmit(createContact)}>
                <div className="flex flex-col gap-3">
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
                    <div className="w-fit p-1 rounded-full mx-auto bg-yellow-300 font-medium">
                        <button 
                            type="submit"
                            className=" p-1 flex items-center justify-center">
                            Create Contact
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

export default ContactForm
