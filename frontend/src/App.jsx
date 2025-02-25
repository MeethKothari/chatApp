import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp/SignUp"
import ChatUi from "./pages/ChatUi/ChatUi"


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/chats" element={<ChatUi />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
