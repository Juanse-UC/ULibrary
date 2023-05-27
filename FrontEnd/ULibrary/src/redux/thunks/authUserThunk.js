import { setUser } from "../slices/userSlice";
import { auth } from "../../firebase/FirebaseConfig";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const loginUserEmailPassword = (email, password) => {
    return async (dispatch) => {

      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log(user)
        dispatch(
          setUser({
            uid: user.uid,
            userName: user.displayName,
          })
        );
  
      } catch (error) {
        console.log(error)
      }
    };
  };

  export const logOut = () => {
    return async (dispatch) => {
      await signOut(auth);
      dispatch(
        setUser({
          uid: null,
          userName: null,
        })
      );
    };
  };