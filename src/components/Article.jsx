import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Ami from "./Ami";
import User from "./User";

function Article() {
  const [activeFetch, setActiveFetch] = useState("todos");
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [amis, setAmis] = useState([]);
  const [loading, setLoading] = useState(true);

  const contenu = useRef();
  const titre = useRef();
  const statut = useRef();

  async function fetchTodos() {
    setLoading(true);
    try {
      const response = await fetch("/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Token not valid") {
          alert("Vous n'êtes pas connecté !");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        throw new Error("Erreur lors du chargement des articles");
      }
      setTodos(data.articles);
      setActiveFetch("todos");
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAmis() {
    setLoading(true);
    try {
      const response = await fetch("/api/amis", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Token not valid") {
          alert("Vous n'êtes pas connecté !");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        throw new Error("Erreur lors du chargement des amis");
      }
      setAmis(data);
      setActiveFetch("amis");
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Token not valid") {
          alert("Vous n'êtes pas connecté !");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        throw new Error("Erreur lors du chargement des utilisateurs");
      }

      setUsers(data);
      setActiveFetch("users");
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  }

  async function deconnexion() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Token not valid") {
          alert("Vous n'êtes pas connecté !");
          window.location.href = "/";
        } else {
          throw new Error("Erreur lors de la déconnexion");
        }
        return;
      }

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  async function deleteAmi(amiId) {
    try {
      const response = await fetch(`/api/amis/${amiId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setAmis((previousAmis) => previousAmis.filter((ami) => ami.id !== amiId));
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  async function passeDemande(receveurId) {
    try {
      const response = await fetch("/api/amis/demande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ receveur_id: receveurId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de l'envoi de la demande"
        );
      }

      const data = await response.json();
      alert("Désormais vous etes des amis!");
      console.log(data); // Affiche la réponse pour debug
    } catch (error) {
      console.error("Erreur :", error);
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addArticle = async (e) => {
    e.preventDefault();
    const contenuValue = contenu.current.value.trim();
    const titreValue = titre.current.value.trim();
    const statutValue = statut.current.value.trim();

    if (!contenuValue || !titreValue || !statutValue) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    const newTodo = {
      titre: titreValue,
      contenu: contenuValue,
      statut: statutValue,
      etat: false,
    };

    try {
      const response = await fetch(`/api/articles`, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'article");

      const data = await response.json();

      fetchTodos();

      contenu.current.value = "";
      titre.current.value = "";
      statut.current.value = "";
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const completeArticle = async (todoId) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    const updatedEtat = !todo.etat; // Inversement de l'état

    try {
      const response = await fetch(`/api/articles/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ ...todo, etat: updatedEtat }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json(); // Récupération de la réponse JSON

      if (!response.ok) {
        if (data.message === "Non autorisé") {
          alert(
            "Cet article ne vous appartient pas, vous n'êtes pas autorisé à le modifer!"
          );
        }
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }

      setTodos((previousTodos) =>
        previousTodos.map((t) =>
          t.id === todoId ? { ...t, etat: updatedEtat } : t
        )
      );
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const deleteArticle = async (todoId) => {
    try {
      const response = await fetch(`/api/articles/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json(); // Récupération de la réponse JSON

      if (!response.ok) {
        if (data.message === "Non autorisé") {
          alert(
            "Cet article ne vous appartient pas, vous n'êtes pas autorisé à le supprimer !"
          );
        }
        throw new Error(data.message || "Erreur lors de la suppression");
      }

      setTodos((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== todoId)
      );
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <>
      <form onSubmit={addArticle}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bienvenu Dans Votre Tableau de Bord
        </h2>
        <input type="text" placeholder="Titre" ref={titre} />
        <input type="text" placeholder="Contenu" ref={contenu} />
        <select ref={statut}>
          <option value="public">Public</option>
          <option value="prive">Privé</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>

      <button
        onClick={fetchTodos}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Liste Article
      </button>
      <button
        onClick={fetchAmis}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Liste Ami
      </button>
      <button
        onClick={fetchUsers}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Liste User
      </button>
      <button
        onClick={deconnexion}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Deconnexion
      </button>

      {loading ? (
        <>Chargement...</>
      ) : (
        <>
          {activeFetch === "todos" && (
            <ul>
              <h2>Liste des Articles</h2>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    completeTodo={completeArticle}
                    deleteTodo={deleteArticle}
                  />
                ))
              ) : (
                <p>Aucun article disponible</p>
              )}
            </ul>
          )}

          {activeFetch === "amis" && (
            <ul>
              <h2>Liste de mes Amis</h2>
              {amis.length > 0 ? (
                amis.map((ami) => (
                  <Ami key={ami.id} ami={ami} deleteAmi={deleteAmi} />
                ))
              ) : (
                <p>Vous n'avez aucun ami pour le moment</p>
              )}
            </ul>
          )}

          {activeFetch === "users" && (
            <ul>
              <h2>Liste des Utilisateurs</h2>
              {users.length > 0 ? (
                users.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    demande={() => passeDemande(user.id)}
                  />
                ))
              ) : (
                <p>Aucun utilisateur pour le moment</p>
              )}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default Article;
