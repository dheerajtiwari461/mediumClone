import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component.jsx";
import UserAuthForm from "./pages/userAuthForm.page.jsx";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { looksInSession } from "./common/session.jsx";


export const UserContext = createContext({});

const App = () => {

    const [userAuth, setUserAuth] = useState({});
    useEffect(() => {
        let userInSession = looksInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null});
    },[])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
        <Routes>
           <Route path="/" element={<Navbar />} >
           <Route path="signin" element={<UserAuthForm type={"sign-in"}/>} />
           <Route path="signup" element={<UserAuthForm type={"sign-up"}/>} />
           </Route>
        </Routes>
        </UserContext.Provider>
    )
}

export default App; 