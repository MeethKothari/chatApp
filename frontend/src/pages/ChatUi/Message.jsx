import { useAuth } from "../../contexts/authProvider.context"


const Message = ({msg}) => {
    //console.log(msg.message)
    const {authUser} = useAuth();
    
    const mineId = authUser.user._id;
    const self = msg.senderId;
    const myself = mineId === self;



    return (
        <div>
            <div className={`p-2 w-max rounded-lg mb-2 ${myself ? "bg-blue-300 ml-auto" : "bg-gray-300"}`}>{msg.message}</div>
        </div>
    )
}

export default Message


// receiver 
// <div className="p-2 bg-gray-200 w-max rounded-lg mb-2">OMG do you remember what you did last night at the work night out?</div>
// <div className="p-2 bg-blue-300 w-max rounded-lg mb-2 ml-auto">no haha</div>