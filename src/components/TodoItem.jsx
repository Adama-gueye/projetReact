import React from "react";

function TodoItem({ deleteTodo, completeTodo, todo }) {
  const { id: todoId, titre, contenu, statut, etat, user } = todo;

  const completeStyle = {
    color: etat ? "green" : "red",
    fontWeight: "bold",
  };
  return (
    <li className="li">
      <div>Titre: {titre}</div>
      <div>Contenu: {contenu}</div>
      <div>Statu: {statut}</div>
      <div>User: {user.name}</div>
      <div style={completeStyle}>{etat ? "Passer Commentaire" : "Bloqué Commentaire"}</div>
      <button onClick={() => deleteTodo(todoId)}>Supprimer</button>
      <button onClick={() => completeTodo(todoId)}>{etat ? "Bloquer" : "Débloquer"}</button>
    </li>
  );
}

export default TodoItem;
