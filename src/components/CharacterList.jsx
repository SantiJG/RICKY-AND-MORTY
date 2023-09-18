import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-primary btn-sm "
        style={{ backgroundColor: "#08bd02" }}
        onClick={() => props.setPage(props.page - 1)}
      >
        Pagina {props.page - 1}
      </button>
      <form>
        <input
          className="search-input"
          type="text"
          onChange={props.handleSearchUpdate}
          placeholder="Nombre del Personaje..."
        />
      </form>
      <button
        className="btn btn-primary btn-sm"
        style={{ backgroundColor: "#08bd02" }}
        onClick={() => props.setPage(props.page + 1)}
      >
        Pagina {props.page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchUpdate = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${searchValue}`
      );
      setLoading(false);
      if (response.status === 404) {
        setCharacters([]);
        return;
      }
      const data = await response.json();

      setCharacters(data.results);
    }

    fetchData();
  }, [page, searchValue]);

  return (
    <div className="contaniner">
      <NavPage
        page={page}
        setPage={setPage}
        handleSearchUpdate={handleSearchUpdate}
      />
      {loading ? (
        <h1>Cargando</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}

      <NavPage
        page={page}
        setPage={setPage}
        handleSearchUpdate={handleSearchUpdate}
      />
    </div>
  );
}

export default CharacterList;
