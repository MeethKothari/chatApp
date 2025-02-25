import { useEffect } from 'react';
import useConversation from "../stateManagement/userConversation.js";
import apiUrl from '../../ipconfig.js';
import { useAuth } from './authProvider.context.jsx';

const useGetMessages = () => {
    const { authUser } = useAuth();
    const { selectedConversation, setMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation || !selectedConversation._id) return;

            try {
                let response = await fetch(`${apiUrl}/messages/get/${selectedConversation._id}`, {
                    headers: { authorization: `Bearer ${authUser.token}` }
                });

                let data = await response.json();
                console.log("Fetched messages:", data);

                if (Array.isArray(data)) {
                    setMessages(data); // ✅ Overwrite with fresh messages
                } else {
                    setMessages([]); // ✅ Prevent errors
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        getMessages();
    }, [selectedConversation]); // ✅ Fetch only when chat changes

    return { messages: useConversation().messages };
};

export default useGetMessages;
