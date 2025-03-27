import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const user = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!user || !email || !password) {
      setErrorMessage("Merci de remplir tous les champs !");
      return;
    }

    const signUpPayload = { name: user, email, password };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(signUpPayload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue !");
      }

      console.log("Inscription réussie :", data);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSignUp} className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Page D'inscription</h2>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <input type="text" placeholder="Nom d'utilisateur" ref={usernameRef} className="w-full p-2 border mb-2" />
      <input type="text" placeholder="Email" ref={emailRef} className="w-full p-2 border mb-2" />
      <input type="password" placeholder="Mot de passe" ref={passwordRef} className="w-full p-2 border mb-4" />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        S'inscrire
      </button>
    </form>
  );
}

export default SignUp
