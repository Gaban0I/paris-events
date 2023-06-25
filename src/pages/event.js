import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Error from "../components/Error";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";

const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EventTitle = styled.h1`
  margin: 20px;
  font-size: 24px;
  text-align: center;
  color: var(--theme-color);
`;

const EventInfo = styled.div`
  flex: 1;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const EventImage = styled.img`
  width: 100%;
  margin-top: 5px;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EventTags = styled.p`
  font-weight: 500;
`;

const EventLeadText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const EventDescription = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const EventDetails = styled.div`
  background-color: rgba(0, 123, 255, 0.1);
  padding: 1rem;
  border-radius: 4px;
  width: 20vw;
`;

const EventDetailTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EventDetailContent = styled.div`
  margin-bottom: 1rem;

  a {
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Link = styled.i`
  margin: 5px;
`;

const EventPage = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if ("error_code" in result) setError(result.message);
          setEvent(result.record);
        },
        (error) => {
          setIsLoaded(true);
          setError(error.message);
        }
      );
  }, [id]);

  return (
    <div>
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {isLoaded && (
        <EventContainer>
          <EventInfo>
            <EventTitle>{event.fields.title}</EventTitle>
            {event.fields.tags && (
              <EventTags>Tag : {event.fields.tags.join(" \u2014 ")}</EventTags>
            )}
            <EventImage
              src={event.fields.cover_url}
              alt={event.fields.cover_alt}
            />

            {event.fields.lead_text && (
              <EventLeadText>{event.fields.lead_text}</EventLeadText>
            )}
            {event.fields.description && (
              <EventDescription
                dangerouslySetInnerHTML={{ __html: event.fields.description }}
              ></EventDescription>
            )}
          </EventInfo>
          <EventDetails>
            <LikeButton event={event} />
            {event.fields.date_description && (
              <EventDetailContent>
                <EventDetailTitle>
                  <Link className="me-1 bi bi-calendar"></Link>Quand ?
                </EventDetailTitle>
                <div
                  dangerouslySetInnerHTML={{
                    __html: event.fields.date_description,
                  }}
                ></div>
              </EventDetailContent>
            )}
            {event.fields.audience && (
              <EventDetailContent>
                <EventDetailTitle>
                  <Link className="me-1 bi bi-people"></Link>Audience :
                </EventDetailTitle>
                <p>{event.fields.audience}</p>
              </EventDetailContent>
            )}
            {event.fields.price_type &&
              event.fields.price_type === "payant" && (
                <EventDetailContent>
                  <EventDetailTitle>
                    <Link className="me-1 bi bi-currency-euro"></Link>Tarif :
                  </EventDetailTitle>
                  {event.fields.price_detail && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: event.fields.price_detail,
                      }}
                    ></div>
                  )}
                  {!event.fields.price_detail && (
                    <p>
                      <Link className="me-1 bi bi-currency-euro"></Link>Payant
                    </p>
                  )}
                </EventDetailContent>
              )}
            {event.fields.price_type &&
              event.fields.price_type === "gratuit" && (
                <EventDetailContent>
                  <p>
                    <Link className="me-1 bi bi-currency-euro"></Link>Gratuit
                  </p>
                </EventDetailContent>
              )}
            {event.fields.access_link && (
              <EventDetailContent>
                <EventDetailTitle>
                  <Link className="me-1 bi bi-ticket"></Link>Réservation :
                </EventDetailTitle>
                <a href={event.fields.access_link}>
                  {event.fields.access_link_text || event.fields.access_link}
                  <Link className="ms-1 bi bi-box-arrow-up-right"></Link>
                </a>
              </EventDetailContent>
            )}
            <EventDetailContent>
              <EventDetailTitle>
                <Link className="me-1 bi bi-geo-alt"></Link>Adresse :
              </EventDetailTitle>
              {event.fields.address_url && <p>{event.fields.address_url}</p>}
              {event.fields.address_name && <p>{event.fields.address_name}</p>}
              {event.fields.address_street && (
                <p>{event.fields.address_street}</p>
              )}
              {event.fields.address_zipcode && (
                <p>{event.fields.address_zipcode}</p>
              )}
              {event.fields.address_city && <p>{event.fields.address_city}</p>}
            </EventDetailContent>
            {event.fields.transport && (
              <EventDetailContent>
                <EventDetailTitle>
                  <Link className="me-1 bi bi-bus-front"></Link>Transports :
                </EventDetailTitle>
                <div
                  dangerouslySetInnerHTML={{
                    __html: event.fields.transport,
                  }}
                ></div>
              </EventDetailContent>
            )}
            <EventDetailContent>
              <EventDetailTitle>
                <Link className="me-1 bi bi-info-circle"></Link>Plus d'infos :
              </EventDetailTitle>
              {event.fields.contact_facebook && (
                <p>
                  <Link className="me-1 bi bi-facebook"></Link>
                  <a href={event.fields.contact_facebook} className="link-dark">
                    Facebook
                    <Link className="ms-1 bi bi-box-arrow-up-right"></Link>
                  </a>
                </p>
              )}
              {event.fields.contact_mail && (
                <p>
                  <Link className="me-1 bi bi-envelope-at"></Link>
                  <a href={`mailto:${event.fields.contact_mail}`}>
                    {event.fields.contact_mail}
                  </a>
                </p>
              )}
              {event.fields.contact_phone && (
                <p>
                  <Link className="me-1 bi bi-telephone"></Link>
                  <a href={`tel:${event.fields.contact_phone}`}>
                    {event.fields.contact_phone}
                  </a>
                </p>
              )}
              {event.fields.contact_twitter && (
                <p>
                  <Link className="me-1 bi bi-twitter"></Link>
                  <a href={event.fields.contact_twitter}>
                    Twitter
                    <Link className="ms-1 bi bi-box-arrow-up-right"></Link>
                  </a>
                </p>
              )}
              {event.fields.contact_url && (
                <p>
                  <Link className="me-1 bi bi-globe"></Link>
                  <a href={event.fields.contact_url}>
                    Site web
                    <Link className="ms-1 bi bi-box-arrow-up-right"></Link>
                  </a>
                </p>
              )}
            </EventDetailContent>
          </EventDetails>
        </EventContainer>
      )}
    </div>
  );
};

export default EventPage;
