import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { useDocument } from "react-firebase-hooks/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBfL5Zv3KtO5T-jF8yPf96LlcKsUgULWws",
  authDomain: "waytr-f5fb7.firebaseapp.com",
  databaseURL: "https://waytr-f5fb7.firebaseio.com",
  projectId: "waytr-f5fb7",
  storageBucket: "waytr-f5fb7.appspot.com",
  messagingSenderId: "890384060345",
  appId: "1:890384060345:web:ccd51196e55ede05923068",
  measurementId: "G-RZNMHQCF94"
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async loginEmail(email, password) {
    const user = await this.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err);
        return err;
      });
    return user;
  }

  async signOut() {
    const SignOut = this.auth.signOut().catch(err => {
      console.log(err);
      return err;
    });
    return SignOut;
  }

  async signUp(newUser) {
    const { firstName, lastName, email, password } = newUser;
    const user = await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.db
          .collection("users")
          .doc(response.user.uid)
          .set({
            firstName,
            lastName
          });
        return response;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    return user;
  }

  async getUserData(uid) {
    let userData = {};
    const [value, loading, error] = await useDocument(
      firebase.firestore().doc("users/" + uid)
    );
    if (error) {
      console.log(error);
    }
    if (!loading && value.data()) {
      userData = value.data();
    }
    return userData;
  }
}
export default new Firebase();
