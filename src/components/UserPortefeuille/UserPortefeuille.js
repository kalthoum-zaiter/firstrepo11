import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPortefeuille() {
  const [portefeuilles, setPortefeuilles] = useState([]);

  

  return (
    <div>
      <h1>Mon Portefeuille</h1>
      {portefeuilles.length > 0 ? (
        <ul>
          {portefeuilles.map((portfolio, index) => (
            <li key={index}>
              <strong>Nom:</strong> {portfolio.name} <br />
              <strong>Valeur:</strong> {portfolio.value} dinars
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun portefeuille associé à l'utilisateur.</p>
      )}
    </div>
  );
}
