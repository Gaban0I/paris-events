import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const location = useLocation();

  const Header = styled.header`
    width: 100vw;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin: 15px 0px;
  `;
  const List = styled.ul`
    width: 30%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  `;
  const Button = styled.button`
    color: black;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
    background-color: ${(props) =>
      props.active ? "lightgrey" : "transparent"};
    &:hover {
      cursor: pointer;
      background-color: lightgrey;
    }
  `;

  return (
    <Header>
      <List>
        <li>
          <Link to="/home">
            <Button active={location.pathname === "/home"}>Accueil</Button>
          </Link>
        </li>
        <li>
          <Link to="/recherche">
            <Button active={location.pathname === "/recherche"}>
              Rechercher des événements
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/favoris">
            <Button active={location.pathname === "/favoris"}>Favoris</Button>
          </Link>
        </li>
      </List>
    </Header>
  );
}

export default Header;
