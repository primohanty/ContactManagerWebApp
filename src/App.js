import { Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home"
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import UpdateContact from "./pages/UpdateContact";


const App = () => {

  


  return (
    <div>

      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/home/createUser" element={<CreateUser/>} />
        <Route path="/home/updatecontact/:id" element={<UpdateContact/>} />
      </Routes>
      
    </div>
  )
};

export default App;
