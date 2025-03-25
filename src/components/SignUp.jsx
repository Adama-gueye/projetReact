import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailnameRef = useRef();

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();

    const sifnPayload = {
      name: usernameRef.current.value,
      email: emailnameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(sifnPayload);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(sifnPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    // localStorage.setItem("token", data.token);
    // console.log(data.token)
    navigate("/");
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Page D'inscription</h2>
        <input type="text" placeholder="Nom d'utilisateur" ref={usernameRef} />
        <input type="text" placeholder="email" ref={emailnameRef} />
        <input type="password" placeholder="Mot de passe" ref={passwordRef} />
        <button type="submit">Connexion</button>
      </form>
    </>
  );
}

export default SignUp;
