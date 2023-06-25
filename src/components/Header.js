import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const HeaderStyled = styled.header`
    background-color: #333;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    color: white;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `;

  const List = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      display: ${isOpen ? "flex" : "none"};
      flex-direction: column;
      width: 100%;
      text-align: center;
      background: #333;
      padding: 10px 0;
      li {
        margin: 10px 0;
      }
    }
  `;

  const BurgerMenu = styled.div`
    user-select: none;
    display: none;
    justify-self: start;
    font-size: 2em;
    @media (max-width: 768px) {
      display: block;
      cursor: pointer;
      color: white;
    }
  `;

  const Button = styled.button`
    color: white;
    font-size: 1em;
    padding: 0.25em 1em;
    margin: 10px;
    border: 2px solid white;
    border-radius: 3px;
    background-color: ${(props) => (props.active ? "#666" : "#333")};
    &:hover {
      cursor: pointer;
      background-color: #666;
    }
    @media (max-width: 768px) {
      &:hover {
        cursor: pointer;
        background-color: #666;
      }
      margin: 0px;
      border: none;
      background-color: ${(props) => (props.active ? "#666" : "#333")};
      font-size: 1.2em;
    }
  `;

  return (
    <HeaderStyled>
      <BurgerMenu onClick={() => setIsOpen(!isOpen)}>☰</BurgerMenu>
      <List>
        <li>
          <Link to="/home" onClick={() => setIsOpen(false)}>
            <Button active={location.pathname === "/home"}>Accueil</Button>
          </Link>
        </li>
        <li>
          <Link to="/recherche" onClick={() => setIsOpen(false)}>
            <Button active={location.pathname === "/recherche"}>
              Rechercher des événements
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/favoris" onClick={() => setIsOpen(false)}>
            <Button active={location.pathname === "/favoris"}>Favoris</Button>
          </Link>
        </li>
      </List>
    </HeaderStyled>
  );
}

export default Header;
