  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Loading } from "../../components/Loading/Loading";
  import apiUrl from "../../../ipconfig";
  import Swal from "sweetalert2";
  import { useAuth } from "../../contexts/authProvider.context";

  const SignUp = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phoneNumber: ""
    })
    const [error, setError] = useState("");
    const [load, setLoad] = useState(false);
    const navigation = useNavigate();
    const { authUser, setAuthUser } = useAuth(); // custom hook for storing userData in global state (contexts\authProvider.jsx)


    
    const handleChanges = (event) => {
      let name = event.target.name;
      let value = event.target.value;

      setFormData({
        ...formData, 
        [name]: value
      })
    }


    const handleSubmit = async(event) => {
      event.preventDefault();
      setLoad(true);
      setError(false);
      try{
        let response = await fetch(`${apiUrl}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        })
        if (response.status === 201){
          let data = await response.json();
          Swal.fire({
            icon: "success",
            title: "Welcome",
          })
          localStorage.setItem("userData", JSON.stringify(data));
          setAuthUser(data);
          setLoad(false);
          navigation("/chats")
        }
        if (response.status === 400){
          let data = await response.json();
          setError(data.message);
          setLoad(false);
        }
      }
      catch(error){
        console.log("error while registering user :" + error)
        setError("Something went wrong. Please try again.");
        setLoad(false);
      }
    }


    return (
      <>
        <div className="h-screen flex items-center justify-center bg-blue-400">
          {load === true ? <Loading /> : (
            <form className="bg-white p-8 rounded-2xl shadow-lg w-[400px]" onSubmit={handleSubmit}>
              <img src="./logo.png" alt="Logo" className="mx-auto mb-4" />
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 mb-3 border rounded-lg"
                required={true}
                name="name"
                value={formData.name}
                onChange={handleChanges}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 border rounded-lg"
                required={true}
                name="email"
                value={formData.email}
                onChange={handleChanges}
              />
              <input
                type="number"
                minLength={10}
                placeholder="Phone Number"
                className="w-full p-2 mb-3 border rounded-lg"
                required={true}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChanges}
              />
              {error && <p style={{color: "red"}}>{error}</p>}
              <button className="w-full p-2 bg-gray-600 text-white rounded-lg" type="submit">Sign Up</button>
            </form>
          )}

        </div>
      </>
    )
  }

  export default SignUp;