import { useEffect, useState } from "react";
import apiUrl from "../../ipconfig";
import { useAuth } from "./authProvider.context";



const GetAllUsers = () => {
    const { authUser } = useAuth(); // access the stored token from local storage/useAuth context
    //console.log(authUser.token);
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        let fetchAllUsers = async () => {

            if (!authUser || !authUser.token) {
                console.log("No auth token available");
                return; // Exit if token is missing
            }

            try {
                let response = await fetch(`${apiUrl}/users/allUsers`, {
                    headers: {
                        Authorization: `Bearer ${authUser.token}`
                    }
                });
                let data = await response.json();

                if (response.status === 200) {
                    setAllUsers(data);
                }
                if (response.status === 400) {
                    console.log(data.message)
                }
            }
            catch (error) {
                console.log("Error in getAllUsers fn :", error)
            }
        }

        fetchAllUsers();
    }, [])

    return [allUsers]; // sending all the users (fetched data) to chat section as an global variable
}


export default GetAllUsers;
