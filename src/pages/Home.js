import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Error from "../components/Error";
import Loader from "../components/Loader";

const HomePage = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0px;
  font-size: 45px;
`;
const Actu = styled.h2`
  margin-top: 40px;
  margin-bottom: 0px;
  font-size: 40px;
`;
const SubTitle = styled.p`
  font-size: ${(props) => (props.big ? "30px" : "20px")};
`;

function Home() {
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?limit=1&order_by=-updated_at,title"
    )
      .then((response) => response.json())
      .then((data) => {
        setEvent(data.records[0].record);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoaded(true);
      });
  }, []);

  return (
    <HomePage className="Home">
      <Title>Bienvenue sur Paris Events</Title>
      <SubTitle>
        L'application qui permet de rechercher en direct les prochains
        évenements Parisiens
      </SubTitle>
      <Actu>Actualité</Actu>
      <SubTitle big>Le dernier événement publié :</SubTitle>

      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {isLoaded && !error && event && event.fields && (
        <Card key={event.id} event={event} />
      )}
    </HomePage>
  );
}

export default Home;
