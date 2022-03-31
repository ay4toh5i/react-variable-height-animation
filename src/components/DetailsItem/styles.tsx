import styled from 'styled-components';
import triangle from './triangle.svg';

export const StyledDetails = styled.details`
  background-color: ${props => props.theme.colors.background};
`;

export const StyledSummary = styled.summary`
  display: flex;
  align-items: center;
  padding-inline: 2rem;
  gap: 1rem;
  height: 3.5rem;
  font-weight: bold;
  background-color: ${props => props.theme.colors.lp.accordionButtonBackground};

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: 'Q.';
    font-size: ${props => props.theme.text.titleSmall};
  }

  &::after {
    content: url(${triangle});
    margin-inline-start: auto;
    transition: transform 0.15s;
    transform: rotateX(0);
  }

  details[open] > &::after {
    transform: rotateX(180deg);
  }

  &:hover {
    cursor: pointer;
    filter: brightness(102%);
  }
`;

export const StyledParagraph = styled.div`
  display: flex;
  gap: 1rem;
  padding-inline: 2rem;
  padding-block: 1rem;
  line-height: 1.625rem;
  text-align: justify;
  white-space: pre-wrap;
  overflow-y: auto;

  &::before {
    content: 'A.';
    display: block;
    font-weight: bold;
    font-size: ${props => props.theme.text.titleSmall};
  }

  a {
    color: ${props => props.theme.colors.main};
  }
`;

