import React from "react";

function User({ demande, user }) {
  const { id: id,name: name} = user;

  return (
    <li className="li">
      <div>Name : {name}</div>
      {/* <div>User: {user_id}</div> */}
      <button onClick={() => demande(id)}>Etre Ami</button>
    </li>
  );
}

export default User;
