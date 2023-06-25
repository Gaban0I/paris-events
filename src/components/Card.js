import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LikeButton from "./LikeButton";

const CardContainer = styled.div`
  flex: 1 0 calc(20%);
  max-width: 45%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 10px;
  @media (max-width: 768px) {
    margin: 5px;
  }
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

const Buttons = styled.div`
  display: flex;
  flex-flow: row-wrap;
  align-items: center;
`;

const MoreButton = styled.button`
  margin-left: 10px;
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
`;

const Card = ({ event }) => {
  return (
    <CardContainer>
      <CardImage src={event.fields.cover_url} alt={event.id} />
      <CardTitle>{event.fields.title}</CardTitle>
      <CardDate
        dangerouslySetInnerHTML={{ __html: event.fields.date_description }}
      />
      <CardDescription
        dangerouslySetInnerHTML={{ __html: event.fields.lead_text }}
      />
      <Buttons>
        <LikeButton event={event} />
        <Link to={`/event/${event.id}`}>
          <MoreButton> En savoir plus </MoreButton>
        </Link>
      </Buttons>
    </CardContainer>
  );
};

export default Card;
