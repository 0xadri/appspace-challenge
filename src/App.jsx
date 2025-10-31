import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const sortAsc = "asc";
  const sortDsc = "dsc";
  const [fullList, setFullList] = useState([]); // All characters
  const [filteredList, setFilteredList] = useState([]); // Filtered characters
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(sortAsc);
  const [load, setLoading] = useState();
  const [error, setError] = useState();

  const fetchData = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    return await res.json();
  };

  useEffect(() => {
    const init = async () => {
      const { results } = await fetchData();
      setFullList(results);
      setFilteredList(results);
    };
    init();
  }, []);

  useEffect(() => {
    let tmpList = [...fullList];

    // Filter by search
    if (searchTerm) {
      tmpList = tmpList.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // ignore case
      );
    }

    // Sort list
    tmpList.sort((a, b) => {
      if (sortOrder === sortAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredList(tmpList);
  }, [searchTerm, sortOrder, fullList]);

  const toggleSortOrder = () => {
    if (sortOrder === sortAsc) {
      setSortOrder(sortDsc);
    } else {
      setSortOrder(sortAsc);
    }
  };

  const handleChangeSearchTerm = (e) => {
    // todo: debounce
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <>
      <h1>Appspace - Frontend Technical Challenge</h1>
      <div className="container">
        <h2>Rick And Morty</h2>
        <div className="filter-sort">
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            className="search-box"
          />
          <input
            type="button"
            value={sortOrder}
            onClick={toggleSortOrder}
            className="sorting-toggle-btn"
          />
        </div>
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
