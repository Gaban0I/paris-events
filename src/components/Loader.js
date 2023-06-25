import React from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top-color: #333;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const LoadingText = styled.span`
  font-size: 14px;
  margin-left: 8px;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
      <LoadingText>Chargement...</LoadingText>
    </LoaderContainer>
  );
};

export default Loader;
