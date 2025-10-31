import { useEffect, useState } from "react";
import "./App.css";
import FilterSort from "./FilterSort.jsx";
import ListCharacters from "./ListCharacters";
import DeetsCharacter from "./DeetsCharacter";

function App() {
  const SORT_ASC = "asc";
  const SORT_DESC = "dsc";
  const NONE_SELECTED_ID = -1;
  const [fullList, setFullList] = useState([]); // All characters
  const [filteredList, setFilteredList] = useState([]); // Filtered characters
  const [idSelectedItem, setIdSelectedItem] = useState(NONE_SELECTED_ID);
  const [selectedChar, setSelectedChar] = useState({}); // Selected character
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(SORT_ASC);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingCharacter, setLoadingCharacter] = useState(false);
  const [listError, setListError] = useState();
  const [charError, setCharError] = useState();

  useEffect(() => {
    const init = async () => {
      setLoadingList(true);
      setListError(undefined);
      try {
        const res = await fetch(import.meta.env.VITE_RICK_AND_MORTY_API_URL);
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
      if (sortOrder === SORT_ASC) {
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
        const URL =
          import.meta.env.VITE_RICK_AND_MORTY_API_URL + "/" + idSelectedItem;
        const res = await fetch(URL);
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
    if (sortOrder === SORT_ASC) {
      setSortOrder(SORT_DESC);
    } else {
      setSortOrder(SORT_ASC);
    }
  };

  const handleChangeSearchTerm = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <>
      <h1 className="h1">
        Appspace Frontend Tech Challenge: Rick And Morty API
      </h1>
      <div className="container">
        {idSelectedItem === NONE_SELECTED_ID && (
          <>
            <h2 className="h2">List Of Characters</h2>
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

        {idSelectedItem !== NONE_SELECTED_ID && (
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
