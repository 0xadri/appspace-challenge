import { useEffect, useState } from "react";
import "./App.css";
import FilterSort from "./FilterSort.jsx";
import ListCharacters from "./ListCharacters";
import DeetsCharacter from "./DeetsCharacter";

function App() {
  const sortAsc = "asc";
  const sortDsc = "dsc";
  const [fullList, setFullList] = useState([]); // All characters
  const [filteredList, setFilteredList] = useState([]); // Filtered characters
  const [idSelectedItem, setIdSelectedItem] = useState(-1);
  const [selectedChar, setSelectedChar] = useState({}); // Selected character
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

  useEffect(() => {
    const initChar = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${idSelectedItem}`
      );
      const data = await res.json();
      setSelectedChar(data);
    };
    if (idSelectedItem !== -1) initChar();
  }, [idSelectedItem]);

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

        {idSelectedItem === -1 && (
          <>
            <FilterSort
              searchTerm={searchTerm}
              handleChangeSearchTerm={handleChangeSearchTerm}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
            />
            <ListCharacters
              filteredList={filteredList}
              setIdSelectedItem={setIdSelectedItem}
            />
          </>
        )}

        {idSelectedItem !== -1 && (
          <DeetsCharacter
            character={selectedChar}
            setIdSelectedItem={setIdSelectedItem}
          />
        )}
      </div>
    </>
  );
}

export default App;
