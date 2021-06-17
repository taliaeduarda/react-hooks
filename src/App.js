import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  //did mount
  useEffect(async () => {
    const response = await fetch(
      "https://api.github.com/users/taliaeduarda/repos"
    );
    const data = await response.json();

    setRepositories(data);
  }, []);

  // did update
  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Voce tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositorories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositorories);
  }

  return (
    <>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
