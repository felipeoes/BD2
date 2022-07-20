import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  background-color: ${(props) => props.theme.colors.white};
  
  .list-item.selected {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};

    ${(props) =>
      !props.open
        ? `background-color: transparent;border-left: 6px ${props.theme.colors.primary} solid; padding-left: 24px;`
        : ""}
  }

  .sidebar-list-0 {
    margin-top: 24px;
    padding: 0;
  }

  .list-item {
    height: 59px;
    font-family: InterRegular;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

    color: ${(props) => props.theme.colors.white};
    padding-left: 30px;
  }
`;

export const SidebarListsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarDivider = styled.div`
  height: 1px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;

export const SidebarUserContainer = styled.div`
  display: flex;
  align-items: center;

  margin-left: 8px;
  width: 100%;

  transition: transform 2s ease;
`;

export const SidebarUserText = styled.span`
  font-family: InterMedium;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  margin-left: 8px;
  color: ${(props) => props.theme.colors.white}};

`;