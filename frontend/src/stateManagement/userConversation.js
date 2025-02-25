import { create } from 'zustand'

const useConversation = create((set) => ({
    // to select the user, userid upon clicked 
    selectedConversation: "",
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    

    // to store the conversation upon the user, userid clicked 
    // messages: [],
    // setMessages: (messages) => set({ messages })
   messages: [],
    setMessages: (newMessages) =>
        set((state) => ({
            messages: Array.isArray(newMessages)
                ? newMessages //  Overwrite messages only if valid
                : state.messages, //  Keep existing messages if invalid
        })),
}))


export default useConversation;