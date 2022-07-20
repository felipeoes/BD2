import React, { useContext } from "react";
import { useTheme } from "styled-components";

import {
  TopbarContainer,
  UserIcon,
  TopbarUserContainer,
  TopbarIconsContainer,
  TopbarText,
} from "./styles";
// import AuthContext from "../../contexts/auth";
// import DropdownMenu from "./../dropdownMenu/DropdownMenu";

import Button from "../button/Button";
import { StyledLink } from "../../views/non-auth/login/styles";
import AuthContext from "../../contexts/auth";
import DropdownMenu from "../dropdownMenu/DropdownMenu";

export function Topbar({
  clean,
  nonAuth,
  topbarButtonText,
  toPath,
  IconElement,
  RightElement,
  bgColor,
  iconMarginLeft,
  disableElevation,
  onClickButton,
}) {
  const context = useContext(AuthContext);
  const { user } = context;
  const theme = useTheme();

  async function handleOnLogout() {
    await context.Logout();
  }

  return clean ? (
    <TopbarContainer bgColor={bgColor} disableElevation={disableElevation}>
      <TopbarIconsContainer marginLeft={iconMarginLeft}>
        {IconElement}
      </TopbarIconsContainer>
      {RightElement}
    </TopbarContainer>
  ) : (
    <TopbarContainer bgColor={bgColor} disableElevation={disableElevation}>
      <TopbarUserContainer>
        {!nonAuth ? (
          <>
            <DropdownMenu
              logout
              onClickLogout={handleOnLogout}
              UserIcon={<UserIcon src={`${user.profile_image}`} />}
            />
            <TopbarText>Olá, {user.first_name}</TopbarText>
          </>
        ) : (
          <TopbarIconsContainer marginLeft={iconMarginLeft}>
            {IconElement}
          </TopbarIconsContainer>
        )}
      </TopbarUserContainer>

      <StyledLink to={toPath}>
        <Button
          width={160}
          marginRight={16}
          // bgColor={theme.colors.primary}
          bgColor="transparent"
          color={theme.colors.primary}
          disableElevation
          onClick={onClickButton}
        >
          {topbarButtonText}
        </Button>
      </StyledLink>
    </TopbarContainer>
  );
}
