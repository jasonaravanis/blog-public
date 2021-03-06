import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Article from "./components/Article/Article";
import Articles from "./components/Articles/Articles";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import { useEffect, useState, createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { KJUR, b64utoutf8 } from "jsrsasign";

// Div inside BrowserRouter has min height of 90vh to account for the footer, which has a height of 10vh
// This structure enables footer to remain the same across all pages.
export const UserContext = createContext(null);

function App() {
  const { storedValue, clearValue } = useLocalStorage("jwt", null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (storedValue) {
      const payload = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(storedValue.split(".")[1])
      ).tokenPayload;
      setUser(payload);
    } else {
      setUser(null);
    }
  }, [storedValue]);

  return (
    <UserContext.Provider value={user}>
      <div className="min-w-[360px]">
        <BrowserRouter>
          <div className="font-roboto min-h-[90vh] bg-blueGray-100 flex">
            <Routes>
              <Route path="/" element={<Navigate replace to="/articles" />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route
                path="articles"
                element={<Articles clearValue={clearValue} />}
              >
                <Route path=":articleID" element={<Article />} />
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
