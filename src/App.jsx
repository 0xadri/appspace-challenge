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
  const [loadingList, setLoadingList] = useState(false);
  const [loadingCharacter, setLoadingCharacter] = useState(false);
  const [listError, setListError] = useState();
  const [charError, setCharError] = useState();

  useEffect(() => {
    const init = async () => {
      setLoadingList(true);
      setListError(undefined);
      try {
        const res = await fetch("https://rickandmortyapi2.com/api/character");
        const data = await res.json();
        setFullList(data.results);
        setFilteredList(data.results);
      } catch (error) {
        setListError(error);
      } finally {
        setLoadingList(false);
      }
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
      setLoadingCharacter(true);
      setCharError(undefined);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${idSelectedItem}`
        );
        const data = await res.json();
        setSelectedChar(data);
      } catch (error) {
        setCharError(error);
      } finally {
        setLoadingCharacter(false);
      }
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
      <h1 className="h1">
        Appspace Frontend Tech Challenge: Rick And Morty API
      </h1>
      <div className="container">
        {idSelectedItem === -1 && (
          <>
            <h2>List Of Characters</h2>
            {listError && <span>Error: {listError.message}</span>}

            {loadingList && <span>Loading list...</span>}

            {!listError && !loadingList && (
              <FilterSort
                searchTerm={searchTerm}
                handleChangeSearchTerm={handleChangeSearchTerm}
                sortOrder={sortOrder}
                toggleSortOrder={toggleSortOrder}
              />
            )}

            {!listError && !loadingList && (
              <ListCharacters
                filteredList={filteredList}
                setIdSelectedItem={setIdSelectedItem}
              />
            )}
          </>
        )}

        {idSelectedItem !== -1 && (
          <DeetsCharacter
            character={selectedChar}
            setIdSelectedItem={setIdSelectedItem}
            loadingCharacter={loadingCharacter}
            charError={charError}
          />
        )}
      </div>
    </>
  );
}

export default App;
