import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {AiOutlineDelete} from "react-icons/ai"
import {FiEdit} from "react-icons/fi"
import toast from "react-hot-toast";

const Home = () =>{
    const [allContactsData, setAllContactsData] = useState([]);                                                    
    const token = useSelector((state) => state.auth.token);

    const getAllContactsData = async () => {

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/contacts/`,
            {
              method: "GET",
              headers: {
                
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              
            }
          );
    
          const data = await response.json();
          console.log("this is data:",data);
          
          setAllContactsData(data.contacts);

          
        } catch(error) {
          console.log("All contacts could not be fetched",error);
        }
    };

    const deleteContact = async (id) =>{
      try{
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/contacts/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            
          }
        );

        const data = await response.json();
        console.log("delete:", data);
        if(response.ok){
          toast.success("Contact Deleted");
          setAllContactsData(data.contacts);
        }
        else{
          toast.error("Contact Deletion Failed");
        }

      }catch(error){
        console.log("API error while deleting contact data",error);
      }
    }

    useEffect(() => {
        getAllContactsData();
      },[]);

    useEffect(()=>{
      console.log("This is allContacts:", allContactsData);
    },[allContactsData]);

    


    return(
        <div>
          
          <section className="container px-4 mx-auto py-4">
            <div className="flex items-center justify-between">
              
              <NavLink to={"/home/createUser"}>
                <div>
                  <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                    Add Contact
                  </button>
                </div>
              </NavLink>
            </div>
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <span>Contact Name</span>
                          </th>
                          <th
                            scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Email
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Phone
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {allContactsData && allContactsData.map((person,index) => (
                          <tr key={index}>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center"> 
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {person.name}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-12 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {person.email}
                              </div>
                            </td>

                            <td className="px-4 py-4 flex items-center gap-x-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {person.phone}
                              <NavLink to={`/home/updatecontact/${person._id}`}>
                                <button>
                                  <FiEdit/>
                                </button>
                              </NavLink>
                        
                              <button onClick={()=> deleteContact(person._id)}>
                                <AiOutlineDelete/>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    )
}

export default Home
