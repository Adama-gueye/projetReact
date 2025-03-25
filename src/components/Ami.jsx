import React from "react";

function Ami({ deleteAmi, ami }) {
  const { id: amiId, demandeur, receveur} = ami;


  return (
    <li className="li">
      <div>Demandeur : {demandeur.name}</div>
      <div>Accepter par : {receveur.name}</div>
      <button onClick={() => deleteAmi(amiId)} color="">Supprimer</button>
      {/* <button onClick={() => completeAmi(amiId)}>bloquer</button> */}
    </li>
  );
}

export default Ami;
