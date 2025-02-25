import GetAllUsers from "../../contexts/allUsers.context";
import useConversation from "../../stateManagement/userConversation";
import ChatUiRight from "./ChatUiRight";
import { useSocketContext } from "../../contexts/socketContext";

const ChatUi = () => {
    const [allUsers] = GetAllUsers(); // context (get all users and chatted with)
    //console.log("all the registered users :", allUsers);

    const { selectedConversation, setSelectedConversation } = useConversation(); // zustand (imported)
    //console.log("chat selected :", selectedConversation);

    const { socket, onlineUsers } = useSocketContext();
    //const isOnline = onlineUsers.includes(allUsers._id)
    //console.log('onlineUsers :', onlineUsers)

    return (
        <>
            <div className="h-screen flex bg-blue-300">

                {/* user area */}
                <aside className="w-[20%] bg-white flex flex-col overflow-y-scroll border-r-2 p-1">
                    <div className="flex flex-col bg-white">
                        <img src="./logo.png" alt="logo" className=" h-[40px] w-[120px] mb-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 mb-4 border rounded-lg"
                        />
                    </div>

                    <div className="space-y-3">
                        {allUsers && allUsers.map((user, index) => {
                            const isSelected = selectedConversation?._id === user._id;
                            const isOnline = onlineUsers.includes(user._id); // append online if user is active

                            return (
                                <div
                                    key={index}
                                    className={`hover:bg-[#F5F5F5] w-[100%] ${isSelected ? " bg-gray-300" : ""}`}
                                    onClick={() => setSelectedConversation(user)}
                                >
                                    <div className="p-2 cursor-pointer flex items-center gap-5 ">
                                        <img src="./Avatar.png" alt="avatar" className="h-10 w-10 ml-0" />
                                        <div className="flex justify-center items-center flex-col">
                                            <p className='text-[20px]'>{user.name}</p>
                                            {isOnline ? <p style={{color: "green", fontSize: "17px"}}>online</p> : <></>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </aside>



                {/* chat area  */}
                <main className="w-[80%] flex-1 bg-[#F5F5F5] flex flex-col">
                    <ChatUiRight />
                </main>


            </div>
        </>
    )
}

export default ChatUi