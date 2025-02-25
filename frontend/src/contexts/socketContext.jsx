import { createContext, useState, useEffect, useContext } from "react";
import {useAuth} from "./authProvider.context.jsx";
import io from "socket.io-client";



const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}


export const SocketProvider = ({ children }) => { 
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuth()
    //console.log(authUser);

    useEffect(() => {
        if (authUser){
           let url = "https://chatapp-aalw.onrender.com"
           //let url = "http://localhost:8082/"
           const socket = io(url, {
            query: {
               userId: authUser.user._id,
            },
           });
           setSocket(socket);
           socket.on("getonline", (users) => {
            setOnlineUsers(users);
            console.log("socket disconnected")
           });
           return () => socket.close();
        }
        else {
            if (socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return (
        <socketContext.Provider value={{ socket, onlineUsers}}>
           {children}
        </socketContext.Provider>
    );
}