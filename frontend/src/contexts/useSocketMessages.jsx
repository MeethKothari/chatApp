import { useEffect } from "react";
import { useSocketContext } from "./socketContext";
import useConversation from "../stateManagement/userConversation";

const useSocketMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log("Received new message via socket:", newMessage);

            setMessages((prevMessages) => {
                // Prevent duplicates
                // if (prevMessages.some(m => m._id === newMessage._id)) return prevMessages;
                return [...prevMessages, newMessage];
            });

        // Store selected conversation in localStorage before refreshing
        // localStorage.setItem("selectedConversation", JSON.stringify(newMessage.sender));
        // window.location.reload(); // Force refresh
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

    return null; // no need to return jsx
};

export default useSocketMessages;

