import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: InterRegular;
  font-size: ${(props) => props.fontSize || 16}px;
  margin-bottom: ${(props) => props.marginBottom || 12}px;
  margin-top: ${(props) => props.marginTop || 8}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;

  ${(props) => (props.error ? `border: 1px red solid ` : "")};
  border-radius: 4px;

  :focus {
    outline: none !important;
    border: 1px solid ${(props) => props.borderColor};
  }
`;

export const StyledInput = styled.input`
  font-family: InterRegular;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "40"}px;
  background: ${(props) => props.bgColor || props.theme.colors.white};
  padding-left: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => props.color || props.theme.colors.black};
  border-width: 0px;

  ${(props) =>
    props.error
      ? `border: 1px red solid `
      : props.borderColor && "border: 1px " + props.borderColor + " solid"};
  border-radius: 4px;

  :hover {
    opacity: 0.7;
  }

  :focus {
    opacity: 1;
  }

  :disabled {
    opacity: 0.3;
    background-color: ${(props) => props.theme.colors.disabledButton};
  }
`;

export const Label = styled.label`
  font-family: InterRegular;
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.fontSize || 14}px;

  color: ${(props) => props.labelColor || props.theme.colors.black};

  margin-top: ${(props) => props.marginTop || 0}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;

export const IconButtonContainer = styled.button`
  z-index: 1;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || "transparent"};
  margin-left: ${(props) => props.marginLeft || -40}px;
`;