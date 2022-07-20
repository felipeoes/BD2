import styled from "styled-components";

export const CardLogoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;


  .img__description {
    position: absolute;
    color: ${(props) => props.theme.colors.black || props.color};
    visibility: hidden;
    opacity: 0;

    transition: opacity 0.2s, visibility 0.2s;
  }

  &:disabled {
    &:hover .img__description  {
        visibility: visible;
        opacity: 1;
        color: ${(props) => props.theme.colors.black80 || props.color};
        z-index: 2;
    }
  }
}`;

export const CardLogoIconContainer = styled.div`
  position: absolute;
`;

export const CardLogoInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2;
  border-radius: 2;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
`;
export const CardLogoInput = styled.input`
  display: none;
`;

export const CardLogoPreview = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const CardLogo = styled.img`
  max-height: 60px;
  max-width: 58px;
  object-fit: fit;
`;

export const ModelCardTextContainer = styled.p`
  height: 109.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
`;

export const ModelVariablesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // flex-direction: column;
  flex-wrap: wrap;
  overflow: auto;
  height: 124px;
  width: 70%;
`;
