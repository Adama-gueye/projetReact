import React from "react";

function Attente({ accept, attente }) {
  const { id, demandeur_id, receveur_id, etat } = attente;

  const completeStyle = {
    color: etat ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <li className="li">
      <div>Demandeur : {demandeur_id}</div>
      <div>Receveur: {receveur_id}</div>
      {/* <div>Statut: {etat ? "Validé" : "En attente"}</div> */}
      {/* <div style={completeStyle}>{etat ? "Visible" : "Bloqué"}</div> */}
      <button onClick={() => accept(id)}>Accepter</button>
    </li>
  );
}

// function ListeAttentes({ attentes, accept }) {
//   return (
//     <div>
//       <h2>Demandes en attente</h2>
//       <ul>
//         {attentes.map((attente) => (
//           <Attente key={attente.id} attente={attente} accept={accept} />
//         ))}
//       </ul>
//     </div>
//   );
// }

export default Attente;
