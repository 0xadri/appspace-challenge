const DeetsCharacter = ({ character, setIdSelectedItem }) => {
  console.log(character);

  return (
    <div className="char-deets">
      <input
        type="button"
        value="Back To List"
        onClick={() => setIdSelectedItem(-1)}
        className="back-to-list-btn"
      />
      <div>
        <img className="char-img" src={character.image} alt={character.name} />
        <div className="char-name">{character.name}</div>
        <div className="char-species-gender">
          {character.species} {character.gender}
        </div>
        <div className="char-status">Dead or Alive? {character.status}</div>
        <div className="char-location">
          Location: {character.location?.name}
        </div>
        <div className="char-origin">Origin: {character.origin?.name}</div>
        <div className="char-episodes">
          Nb Of Episodes Featured In:{" "}
          {character.episode?.length ?? "unavailable"}
        </div>
      </div>
    </div>
  );
};

export default DeetsCharacter;
