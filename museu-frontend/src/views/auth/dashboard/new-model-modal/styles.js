import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || "center"};
  width: ${(props) => props.width || 443}px;
  height: ${(props) => props.height || "auto"}px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const UploadViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TextFieldsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const UploadOptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
  margin-top: ${(props) => props.marginTop || 16}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;

export const UploadGroupingContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 90%;
`;

export const RadioButtonsContainer = styled.div`
  margin-left: -16px;
`;

export const FilesTreeViewContainer = styled.div`
  padding-top: 8px;
  max-height: 152px;
  overflow: auto;
`;
