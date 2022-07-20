import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-left: 16px;
  padding-right: ${(props) => props.paddingRight || 16}px;

  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .react-horizontal-scrolling-menu--item:first-child {
    margin-left: ${(props) => props.firstItemMl || 24}px;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    flex-basis: 100%;
    flex-shrink: 0;
  }

  .react-horizontal-scrolling-menu--wrapper {
    width: ${(props) => props.scrollWidth || 450}px;
  }

  .list-item-close-icon: {
    display: none;
  }

  .list-item-close-icon:hover {
    cursor: pointer;
  }
`;
