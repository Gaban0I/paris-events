import { useEffect, useState } from "react";
import { STORAGE_NAME } from "../global.js";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";

const FavorisContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  & > p {
    text-align: center;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const DeleteButton = styled.button`
  height: 40px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: all 0.2s linear;

  &:hover {
    border: 1px solid black;
  }
`;

function Saved() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [saved, setSaved] = useState([]);

  const fetchOneEvent = (eventId) => {
    return new Promise((resolve) => {
      fetch(
        `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${eventId}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(result.record);
          },
          (error) => {
            setIsLoaded(true);
            setError(error.message);
          }
        );
    });
  };

  function deleteAllSaved() {
    if (STORAGE_NAME in localStorage) localStorage.removeItem(STORAGE_NAME);
    setSaved([]);
  }

  useEffect(() => {
    setIsLoaded(false);
    let storedSaved = localStorage[STORAGE_NAME];
    if (!storedSaved) {
      setIsLoaded(true);
    } else {
      storedSaved = JSON.parse(storedSaved);
      const promises = [];
      for (const key in storedSaved) {
        promises.push(fetchOneEvent(key));
      }
      Promise.all(promises).then((values) => {
        setIsLoaded(true);
        setSaved(values.filter((value) => value));
      });
    }
  }, []);

  return (
    <FavorisContainer>
      <h1>Evènements enregistrés</h1>
      <p>
        Retrouvez ici les évènements que vous avez enregistrés pendant votre
        navigation !
      </p>
      {saved.length === 0 && isLoaded && !error && (
        <p className="text-secondary fst-italic">
          Vous n'avez enregistré aucun évènement.
        </p>
      )}
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      <Cards>
        {!error &&
          isLoaded &&
          saved &&
          saved.map((item) => item && <Card key={item.id} event={item} />)}
      </Cards>
      {!error && isLoaded && saved.length > 0 && (
        <div>
          <DeleteButton onClick={deleteAllSaved}>Tout supprimer</DeleteButton>
        </div>
      )}
    </FavorisContainer>
  );
}

export default Saved;
