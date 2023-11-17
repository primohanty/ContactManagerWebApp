import { useState } from "react"
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
    const [currentTab, setCurrentTab] = useState("Login");
    const [activeButton, setActiveButton] = useState("Login");
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setCurrentTab(buttonName);
      };
    return(

        <div className="flex h-screen">
            <div className="flex flex-col items-center mx-auto my-auto outline outline-gray-400 rounded-lg h-[400px] w-[320px] gap-5">

                <div className= "mt-3 rounded-full p-1 flex gap-1 font-medium text-gray-900 text-[16px] bg-slate-100">

                    <button 

                        className={` rounded-full p-2  ${
                            activeButton === "Login" ? "bg-yellow-300" : "bg-slate-100"
                          }`}

                        onClick={() => handleButtonClick("Login")}>
                            Login
                    </button>

                    <button 

                        className={`rounded-full p-2 ${
                            activeButton === "Signup" ? "bg-yellow-300" : "bg-slate-100"
                          }`}

                        onClick={() => handleButtonClick("Signup")}>
                            Signup

                    </button>
                </div>

                <div className="w-[90%] p-2 flex flex-col">
                    {

                        currentTab === "Login" ? (<LoginForm/>) : (<RegisterForm/>)

                    }
                </div>
                
            </div>
            
        </div>

    )

}

export default Login
