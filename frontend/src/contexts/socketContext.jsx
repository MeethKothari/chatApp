import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./authProvider.context.jsx";
import io from "socket.io-client";
import useConversation from "../stateManagement/userConversation.js";



const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuth()
    const {messages, setMessages} = useConversation();
    //console.log(authUser);


    useEffect(() => {
        if (authUser) {
            let url = "https://chatapp-aalw.onrender.com"
            //let url = "http://localhost:8082"
            const socket = io(url, {
                query: {
                    userId: authUser.user._id,
                },
            });
            setSocket(socket);

            // set online users 
            socket.on("getonline", (users) => {
                setOnlineUsers(users);
            });


             // Listen for new messages
             const handleNewMessage = (newMessage) => {
                console.log("New message received on client:", newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            };
            socket.on("newMessage", handleNewMessage);


            return () => {
                socket.off("newMessage", handleNewMessage);
                socket.close();
            }
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}