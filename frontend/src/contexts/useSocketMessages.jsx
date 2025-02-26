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
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage");
        };
    }, [socket, setMessages]);

    return null; // No need to return JSX
};

export default useSocketMessages;
