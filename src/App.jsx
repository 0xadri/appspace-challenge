import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]); // All characters
  const [filteredList, setFilteredList] = useState([]); // Filtered characters
  const [searchTerm, setSearchTerm] = useState("");
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
      setFilteredList(results);
    };
    init();
  }, []);

  const handleChangeSearchTerm = (e) => {
    // todo: debounce
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = list.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <>
      <h1>Appspace - Frontend Technical Challenge</h1>
      <div className="container">
        <h2>Rick And Morty</h2>
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          className="search-box"
        />
        <ul className="list">
          {filteredList &&
            filteredList.map((item) => (
              <li key={item.id} className="list-item">
                <div className="wrap">
                  <img
                    className="img"
                    src={item.image}
                    alt={item.name}
                    width={100}
                  />
                  <div className="name">{item.name}</div>
                  <div className="species-gender">
                    {item.species} {item.gender}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
