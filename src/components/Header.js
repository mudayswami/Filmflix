import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import {useSelector, Provider, useDispatch } from "react-redux";
import {signOut, onAuthStateChanged, getAuth  } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
export const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("-body--redux update-");
        // console.log(user);
        const {uid, email, displayName , photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
        // ...
        // console.log("----");
        navigate("/browse");
      } else {
        dispatch(removeUser());
        // User is signed out
        navigate("/");

        // ...
      }
    });
  }, []);

  return (
    <div className="fixed z-10 top-0 w-full text-white bg-gradient-to-b from-black opactiy-60 flex justify-between">
      <div className="logo">
        <img
          className="w-52  mx-8"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        ></img>
      </div>
      { user &&(
        <div
          className="flex flex-row items-center space-x-4
        menu"
        >
          <a>Genere</a>
          <div className="menu flex  items-center peer cursor-pointer">
            <img className="w-12 h-12 m-2" href="" src={user.photoURL} />
            <span className="h-0 w-0 mr-8  border-x-8 border-x-transparent border-b-[10px] border-b-white-600"></span>
            <div className="peer-has-[:checked]:hidden border-black ">
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => {signOut(auth)
                      .then(() => {
                        console.log("signed out");
                        navigate("/");
                      })
                      .catch((error) => {})}}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
