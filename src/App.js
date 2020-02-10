import React, { useContext } from "react";
import Routes from "./components/layout/Routes";
import Navbar from "./components/layout/Navbar";
import Firebase from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, initialising] = useAuthState(Firebase.auth);
  const { currentUserId, setCurrentUserId } = useContext(UserContext);
  if (!initialising) {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        setCurrentUserId(user);
      });
    } else if (currentUserId.uid !== null) {
      setCurrentUserId({ uid: null });
    }
    return (
      <div className="App wholepage">
        <Navbar user={user} />
        <Routes />
      </div>
    );
  }
  return <div className="loader container center"></div>;
}

export default App;
