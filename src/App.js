import React, { useContext } from "react";
import Routes from "./components/layout/Routes";
import Nav from "./components/layout/Navbar";
import Firebase from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, initialising] = useAuthState(Firebase.auth);
  const { currentUserId, setCurrentUserId } = useContext(UserContext);

  if (!initialising) {
    if (user) {
      setCurrentUserId(user);
    } else if (currentUserId.uid !== null) {
      setCurrentUserId({ uid: null });
    }
  }

  return (
    <div className="App wholepage">
      <Nav />
      <Routes />
    </div>
  );
}

export default App;
