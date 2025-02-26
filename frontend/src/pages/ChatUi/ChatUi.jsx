import GetAllUsers from "../../contexts/allUsers.context";
import useConversation from "../../stateManagement/userConversation";
import ChatUiRight from "./ChatUiRight";
import { useSocketContext } from "../../contexts/socketContext";
import { useState, useEffect } from "react";

const ChatUi = () => {
    const [allUsers] = GetAllUsers(); // context (get all users and chatted with)
    const { selectedConversation, setSelectedConversation } = useConversation(); // zustand (imported)
    const { socket, onlineUsers } = useSocketContext();

    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(allUsers); // Store filtered users

    // Update `filteredUsers` when `allUsers` is fetched
    useEffect(() => {
        setFilteredUsers(allUsers);
    }, [allUsers]);

    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        setSearchValue(text);
        
        if (text.trim() === "") {
            setFilteredUsers(allUsers); // Reset to all users if search is empty
        } else {
            const filtered = allUsers.filter((user) => 
                user.name.toLowerCase().includes(text)
            );
            setFilteredUsers(filtered);
        }
    };

    return (
        <div className="h-screen flex bg-[F5F5F5]">
            {/* user area */}
            <aside className="w-[20%] bg-white flex flex-col border-r-2 p-1">
                <div className="flex flex-col bg-white w-[20%]" style={{ position: "fixed", zIndex: '1' }}>
                    <img src="./logo.png" alt="logo" className="h-[40px] w-[120px] mb-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 mb-4 border rounded-lg"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>

                <div className="space-y-3 top-28 overflow-y-scroll h-[85vh] w-[20%]" style={{ position: "absolute" }}>
                    {filteredUsers && filteredUsers.map((user, index) => {
                        const isSelected = selectedConversation?._id === user._id;
                        const isOnline = onlineUsers.includes(user._id); // append online if user is active

                        return (
                            <div
                                key={index}
                                className={`hover:bg-[#F5F5F5] w-[100%] ${isSelected ? " bg-gray-300" : ""}`}
                                onClick={() => setSelectedConversation(user)}
                            >
                                <div className="p-2 cursor-pointer flex items-center gap-5">
                                    <img src="./Avatar.png" alt="avatar" className="h-10 w-10 ml-0" />
                                    <div className="flex justify-center items-center flex-col">
                                        <p className='text-[20px]'>{user.name}</p>
                                        {isOnline && (<p style={{ color: "green", fontSize: "17px" }}>online</p>) }
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* chat area  */}
            {!selectedConversation ? (
                <div className="w-[80%] flex items-center justify-center">
                    <h1 className="text-2xl">Select someone to start your conversation..</h1>
                </div>
            ) : (
                <main className="w-[80%] flex-1 bg-[#F5F5F5] flex flex-col">
                    <ChatUiRight />
                </main>
            )}
        </div>
    );
};

export default ChatUi;
