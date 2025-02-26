    import { useEffect, useRef, useState } from 'react';
    import useGetMessages from '../../contexts/useGetMessages';
    import useSendMessages from '../../contexts/useSendMessages';
    import useConversation from '../../stateManagement/userConversation';
    import Message from './Message';
    import { useSocketContext } from "../../contexts/socketContext";
    import useSocketMessages from '../../contexts/useSocketMessages';



    const ChatUiRight = () => {
        const [msgValue, setMsgValue] = useState("");
        const { messages } = useGetMessages();
        const { sendMessages } = useSendMessages(); 
        //console.log('messages :', messages)
        const { selectedConversation } = useConversation();


        // form submission
        const handleSubmit = (event) => {
            event.preventDefault(); // Prevent page reload

            if (!msgValue.trim()) return; // Prevent empty messages

            sendMessages(msgValue); // Send the message
            setMsgValue(""); // Clear input field
        }




        // check which user is online
        const { socket, onlineUsers } = useSocketContext();
        //const isOnline = onlineUsers.includes(allUsers._id)
        //console.log('onlineUsers :', onlineUsers)

        const isOnline = onlineUsers.includes(selectedConversation._id); // append online if user is active



        // useSocketMessages() - for real time messages
        useSocketMessages()



        // scroll to last message
        const lastMessageRef = useRef();
        useEffect(() => {
            // setTimeout(() => {
                if (lastMessageRef.current) {
                    lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
                }
            // }, 100)
        }, [messages])

        return (
            <>
                <div className="p-4 flex items-center gap-5 border-b-2">
                    <img src="./Avatar.png" alt="avatar" className="h-10 w-10 ml-0" />
                    <div className=' flex flex-col'>
                        <p className='text-[25px]'>{selectedConversation.name}</p>
                        {isOnline ? <p style={{ color: "green", fontSize: "20px" }}>online</p> : <p style={{ color: "red", fontSize: "20px" }}>offline</p>}
                    </div>
                </div>



                <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-5">
                    {/* {messages.length === 0 ? (
                        <div className="text-4xl text-center">
                            <p>Say hi and start conversation !!</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <div ref={lastMessageRef} key={msg._id}>
                                    <Message msg={msg} />
                                </div>
                            ))}
                        </>
                    )} */}
                    {messages.map((msg) => (
                        <div ref={lastMessageRef} key={msg._id}>
                            <Message msg={msg} />
                        </div>
                    ))}
                </div>



                <form className="m-5 flex gap-4 items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Message"
                        className="w-[100%] border rounded-lg focus:outline-none py-3 px-2"
                        value={msgValue}
                        onChange={(e) => { setMsgValue(e.target.value) }}
                    />
                    <button className="p-2 bg-blue-500 text-white rounded-lg">
                        Send
                    </button>
                </form>
            </>
        )
    }

    export default ChatUiRight