import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState();
  const [load, setLoading] = useState();
  const [error, setError] = useState();

  const fetchData = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    return await res.json();
  };

  useEffect(() => {
    const init = async () => {
      const { results } = await fetchData();
      setList(results);
    };
    init();
  }, []);
  return (
    <>
      <h1>Appspace - Frontend Technical Challenge</h1>
      <div className="container">
        <h2>Rick And Morty</h2>
        <ul className="list">
          {list &&
            list.map((item) => (
              <li key={item.id} className="list-item">
                <div className="wrap">
                  <img
                    className="img"
                    src={item.image}
                    alt={item.name}
                    width={100}
                  />
                  <div className="name">{item.name}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
