const ListCharacters = ({ filteredList, setIdSelectedItem }) => {
  return (
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
                onClick={() => setIdSelectedItem(item.id)}
              />
              <div className="name">{item.name}</div>
              <div className="species-gender">
                {item.species} {item.gender}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ListCharacters;
