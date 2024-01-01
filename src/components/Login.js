import React, { useEffect } from "react";
import { Header } from "./Header";
import { useState, useRef } from "react";
import validate from "../utils/validate";
import { auth } from "../utils/firebase";
import { Header } from "./Header";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";
export const Login = () => {
  const [sign, setsign] = useState(0);
  const [error_msg, seterror_msg] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const navigate = useNavigate();
  const user = auth.currentUser;
  console.log(user);
   
    if (user) {
      navigate("/browse");
    }

  return (
    <div>
      <Header />
      <div className="relative rounded w-full">
        <img
          className="absolute -z-10 w-full h-auto"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
        <div className="absolute w-screen h-screen bg-black opacity-60"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email_login = email.current.value;
            const password_login = password.current.value;
            const valid = validate(email, password);
            seterror_msg(valid);

            if (sign == 0 && valid == null) {
              // Login IN
              console.log("LoginIn");
              signInWithEmailAndPassword(auth, email_login, password_login)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  navigate("/browse");
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  seterror_msg(errorCode + " - " + errorMessage);
                  navigate("/");
                });
            } else if (sign == 1 && valid == null) {
              // Sign Up
              // console.log(fullname);
              const fullname_d = fullname.current.value;
              // console.log("SignUp");
              createUserWithEmailAndPassword(auth, email_login, password_login)
                .then((userCredential) => {
                  // Signed up
                  const user = userCredential.user;
                  // console.log(user);

                  updateProfile(auth.currentUser, {
                    displayName: fullname_d,
                    photoURL:
                      "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
                  })
                    .then(() => {
                      // console.log(auth.currentUser);
                      navigate("/browse");
                    })
                    .catch((error) => {
                      // An error occurred
                      // ...
                      navigate("/");
                    });

                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  seterror_msg(errorCode + " - " + errorMessage);
                  navigate("/");

                  // ..
                });
            }
          }}
          className="absolute mx-auto my-20 right-0 left-0 bg-black px-16 py-12 bg-opacity-70 w-1/4 text-white "
        >
          <h1 className=" font-medium text-3xl rounded my-6">
            {sign == 0 ? "Sign In" : "Sign Up"}
          </h1>
          {sign != 0 && (
            <input
              ref={fullname}
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full rounded bg-zinc-700"
            ></input>
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email or phone number"
            className="p-4 my-2 w-full rounded bg-zinc-700"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 rounded bg-zinc-700 w-full"
          ></input>
          <div className="mb-20">
            <p className="text-red-600">{error_msg}</p>
            <button className="bg-red-600 rounded w-full py-3 font-bold mt-10">
              {sign == 0 ? "Sign In" : "Sign Up"}
            </button>
            <div className="text-zinc-400 flex justify-between pt-2 mb-24 text-sm">
              <span>
                <input
                  type="checkbox"
                  selected
                  className="text-zinc-400 bg-zinc-400"
                ></input>
                Remember me
              </span>
              <button>Need help?</button>
            </div>
            <span className="text-zinc-400 ">
              {sign == 0 ? "New to Netflix?" : "Already Registered?"}
            </span>
            <button
              type="button"
              className="px-1"
              onClick={() => {
                sign == 0 ? setsign(1) : setsign(0);
              }}
            >
              {sign == 1 ? "Login In" : "Sign up now."}
            </button>
            <p className="py-2 text-zinc-400 text-sm">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="" className="text-blue-600">
                Learn more.
              </a>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
