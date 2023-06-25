import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";

const SearchContainer = styled.div`
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

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
`;
const SearchInput = styled.input`
  height: 40px;
  width: 250px;
  padding: 5px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px 0px 0px 20px;
`;
const SearchButton = styled.button`
  height: 40px;
  width: 40px;
  border: 2px solid black;
  border-left: 0px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
`;

function Search() {
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [noResult, setNoResult] = useState();
  const [val, setVal] = useState("");
  const click = () => {
    if (val.length > 0 && val !== " ") {
      setIsLoaded(false);
      fetch(
        `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${val}&sort=title&limit=15`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setError(null);
            if ("error_code" in result) setError(result.message);
            setEvent(result.records.map((item) => item.record));
            if (result.records.length === 0) {
              setNoResult(true);
            } else {
              setNoResult(null);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error.message);
          }
        );
    } else {
      setError("La recherche ne peut pas être vide!");
    }
  };
  const change = (event) => {
    setVal(event.target.value);
  };

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?limit=15&order_by=date_start,title"
    )
      .then((response) => response.json())
      .then((data) => {
        setEvent(data.records.map((item) => item.record));
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoaded(true);
      });
  }, []);

  return (
    <SearchContainer>
      <h1>Effectuez une recherche</h1>
      <p>
        Recherchez la sortie parisienne qui vous convient parmi la multitude
        d'évènements à venir !
      </p>
      <hr />
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Rechercher parmi les évènements..."
          aria-label="Rechercher parmi les évènements..."
          aria-describedby="button-addon"
          value={val}
          onChange={change}
        />
        <SearchButton type="button" id="button-addon" onClick={click}>
          <i className="bi bi-search"></i>
        </SearchButton>
      </SearchInputContainer>

      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {noResult && <p>Aucun résultat</p>}
      {isLoaded && !error && (
        <Cards>
          {event.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </Cards>
      )}
    </SearchContainer>
  );
}

export default Search;
