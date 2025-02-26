import { create } from 'zustand';

const useConversation = create((set) => ({
    // to select the user, userid upon clicked  // Selected user conversation
    selectedConversation: "",
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    

    // to store the conversation upon the user, userid clicked // Messages state
    // messages: [],
    // setMessages: (messages) => set({ messages })
   messages: [],
    setMessages: (newMessages) =>
        set((state) => ({
            messages: Array.isArray(newMessages)
            ? [...state.messages, ...newMessages] // Append new messages
            : state.messages, // Keep existing messages if invalid
        })),
}))


export default useConversation;