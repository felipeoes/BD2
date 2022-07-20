import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "center")};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0")};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0")};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")};
`;
