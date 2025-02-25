import useConversation from "../stateManagement/userConversation.js";
import apiUrl from '../../ipconfig.js';
import { useAuth } from './authProvider.context.jsx';

const useSendMessages = () => {

  const { authUser } = useAuth() // access the stored token from local storage/useAuth context
  const { selectedConversation, messages, setMessages } = useConversation();
 //console.log(messages)

    const sendMessages = async (textMessage) => {

      if (selectedConversation && selectedConversation._id) {
        try {
            let response = await fetch(`${apiUrl}/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${authUser.token}`
            },
            body: JSON.stringify({ message: textMessage })
          });

          if (!response.ok) {
            throw new Error("Failed to send message");
          }
    
          const newMessage = await response.json(); // Assuming API returns the sent message
          // Append new message to existing messages
          setMessages((prevMessages) => [...prevMessages, newMessage]);
    
        } catch (error) {
          console.log(error)
        }
      }
    }

  return { messages, sendMessages }
}

export default useSendMessages