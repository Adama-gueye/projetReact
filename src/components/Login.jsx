import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const loginPayload = {
      email: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(loginPayload);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    localStorage.setItem("token", data.token);
    console.log("Token reçu :", data.token);

    navigate("/article");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Nom d'utilisateur" ref={usernameRef} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Mot de passe" ref={passwordRef} className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Se connecter</button>
        </form>
        <button onClick={() => navigate("/register")} className="w-full mt-4 text-blue-500 hover:underline">S'inscrire</button>
      </div>
    </div>
  );
}

export default Login;
