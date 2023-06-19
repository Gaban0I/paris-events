import { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
function Search() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?order_by=date_start desc, title asc"
    )
      .then((response) => response.json())
      .then((data) => {
        // Le tableau "data.records" contient tous les événements
        setEvent(data.records.map((item) => item.record.fields));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);

  const Cards = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  `;
  return (
    <div className="Search">
      <h1>Bienvenue sur la page Search</h1>

      <Cards>
        {event.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </Cards>
    </div>
  );
}

export default Search;
