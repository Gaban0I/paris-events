import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
function Home() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?limit=1&order_by=date_start desc, title desc"
    )
      .then((response) => response.json())
      .then((data) => {
        // Le tableau "data.records" contient tous les événements
        console.log(data.records[0].record.fields);
        setEvent(data.records[0].record.fields);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);
  const Home = styled.div`
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
  return (
    <Home className="Home">
      <Title>Bienvenue sur Paris Events</Title>
      <SubTitle>
        L'application qui permet de rechercher en directles prochains évenements
        Parisiens
      </SubTitle>
      <Actu>Actualité</Actu>
      <SubTitle big>Le dernier évenements publié :</SubTitle>
      {event && <Card event={event} />}
    </Home>
  );
}

export default Home;
