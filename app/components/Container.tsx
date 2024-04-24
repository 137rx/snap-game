import styled from 'styled-components';

const Container =  styled.div<{ direction?: string; justifyContent?: string; alignItems?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'}; 
  justify-content: ${({ justifyContent }) => justifyContent || 'space-around'};
  align-items: ${({ alignItems }) => alignItems || 'space-around'};
  max-width: 42vh;
  `;

export default Container