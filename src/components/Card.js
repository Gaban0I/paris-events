import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { STORAGE_NAME } from "../global";

const CardContainer = styled.div`
  flex: 1 0 calc(20%);
  max-width: 45%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const CardDate = styled.p`
  font-size: 14px;
  margin: 0 0 8px 0;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin: 0 0 16px 0;
`;

const LikeButton = styled.button`
  width: 40px;
  height: 40px;
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
  &.liked {
    border: 1px solid red;
  }

  svg {
    fill: ${(props) => (props.liked ? "#f44336" : "gray")};
    transition: fill 0.2s linear;
  }

  &:hover svg {
    fill: ${(props) => (props.liked ? "#f44336" : "black")};
  }

  &.liked svg {
    fill: #f44336;
  }
`;

const HeartSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 32 32"
  >
    <path d="M16.043 28.627C12.139 25.028 2 15.314 2 9.344 2 5.082 5.582 2 10.186 2 13.07 2 15.402 3.72 16 4.342 16.598 3.72 18.931 2 21.814 2 26.418 2 30 5.082 30 9.344c0 5.97-10.14 15.684-13.957 19.283l-.485.408-.515-.408z" />
  </svg>
);

const Card = ({
  event: { title, id, cover_url, date_description, lead_text },
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    let dataStore = localStorage[STORAGE_NAME];
    if (!dataStore) {
      const newSavedStorage = {};
      newSavedStorage[id] = id;
      localStorage[STORAGE_NAME] = JSON.stringify(newSavedStorage);
    } else {
      dataStore = JSON.parse(dataStore);
      if (dataStore[id]) {
        delete dataStore[id];
        setLiked(false);
      } else {
        dataStore[id] = id;
        setLiked(true);
      }
      localStorage[STORAGE_NAME] = JSON.stringify(dataStore);
    }
  };

  useEffect(() => {
    let dataStore = localStorage[STORAGE_NAME];
    if (dataStore) {
      dataStore = JSON.parse(dataStore);
      if (!dataStore[id]) {
        setLiked(false);
      } else if (dataStore[id]) {
        setLiked(true);
      }
    }
  }, [id]);

  return (
    <CardContainer>
      <CardImage src={cover_url} alt={id} />
      <CardTitle>{title}</CardTitle>
      <CardDate dangerouslySetInnerHTML={{ __html: date_description }} />
      <CardDescription dangerouslySetInnerHTML={{ __html: lead_text }} />
      <LikeButton
        liked={liked}
        className={liked ? "liked" : ""}
        onClick={handleLikeClick}
      >
        <HeartSVG />
      </LikeButton>
    </CardContainer>
  );
};

export default Card;
