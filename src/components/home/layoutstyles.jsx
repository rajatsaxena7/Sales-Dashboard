import styled from "styled-components";

export const SLayout = styled.div`
  display: flex;
  width: 100vw; /* Ensure the component fills the width of its parent */
`;

export const SMain = styled.main`
  padding: 2rem; /* Use a fixed padding value or adjust as needed */
  flex: 1; // This tells SMain to take up all remaining space
  width: 100%; // Ensure it takes the full width of its flex container space
  height: 100vh;
  h1 {
    font-size: 14px;
  }
`;
