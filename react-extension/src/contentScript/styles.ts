import styled from "styled-components";

export const Container = styled.main`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #0d1117;
  color: #fff;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
  }

  select {
    padding: 5px 10px;
    background: #010409;
    color: #fff;
    border: 1px solid #444;
    border-radius: 4px;
  }
`;

export const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Card = styled.div`
  background: #010409;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  p {
    font-size: 2rem;
    color: #f9fafb;
  }

  small {
    color: #aaa;
  }
`;

export const Charts = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  canvas {
    background: #010409;
    padding: 20px;
    border-radius: 8px;
  }
`;