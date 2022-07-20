import React from "react";
import { useState, useContext } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { useTheme } from "styled-components";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";

import {
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdPersonOutline,
  MdSettings,
  MdOutlineLogout,
  MdOutlineIntegrationInstructions,
  MdPreview,
  MdOutlineBarChart,
} from "react-icons/md";

import {
  SidebarContainer,
  SidebarDivider,
  SidebarListsContainer,
  SidebarUserContainer,
  SidebarUserText,
} from "./styles";

import { Topbar } from "../topbar/Topbar";
import { StyledLink } from "../../views/non-auth/login/styles";
import AuthContext from "../../contexts/auth";
import DropdownMenu from "./../dropdownMenu/DropdownMenu";
import { UserIcon } from "../topbar/styles";

import { paths } from "./../../services/utils/paths";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(84px + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - calc(84px + 1px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const primaryItemsList = [
  {
    name: "Dashboard",
    path: paths.dashboard,
    icon: MdDashboard,
  },
  {
    name: "Manipulacao",
    path: paths.testing,
    icon: MdOutlineIntegrationInstructions,
  },
  {
    name: "Listagem",
    path: paths.logs,
    icon: MdPreview,
  },
  {
    name: "Monitoramento",
    path: paths.monitoring,
    icon: MdOutlineBarChart,
  },
  // {
  //   name: "Gerenciamento",
  //   path: paths.admin,
  //   icon: MdPersonOutline,
  //   groups: [groups.admin],
  // },
  // {
  //   name: "Repositórios",
  //   path: paths.repositories,
  //   icon: MdOutlineCollectionsBookmark,
  // },
  // {
  //   name: "Bind",
  //   path: paths.bind,
  //   icon: MdOutlineIntegrationInstructions,
  // },
  // {
  //   name: "Perfil",
  //   path: paths.profile,
  //   icon: MdPersonOutline,
  // },
];

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(primaryItemsList[0]);
  const [openTooltip, setOpenTooltip] = useState(null);

  const theme = useTheme();
  const { dispatch } = useContext(AuthContext);

  let user = {
    first_name: "Felipe",
    last_name: "Santo",
    email: "felipeoes@usp.br",
    profile_image: "https://avatars.githubusercontent.com/u/62308968?v=4",
  };

  if (user?.profile_image?.includes("api")) {
    user.profile_image = user.profile_image.replace("api/", "");
  }

  const RenderPage = props.RenderPage;
  const handleCloseTooltip = () => {
    setOpenTooltip(null);
  };

  const handleOpenTooltip = (name) => {
    setOpenTooltip(name);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    handleCloseTooltip();
  };

  function handleOnClickNavItem(item) {
    setSelectedItem(item);
  }

  function handleOnLogout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  const secondaryItemsList = [
    {
      name: "Configurações",
      path: "/settings",
      icon: MdSettings,
    },
    {
      name: "Sair",
      path: "/login",
      icon: MdOutlineLogout,
      onClick: handleOnLogout,
    },
  ];

  function NavbarLinkItem({ item, open }) {
    let resolved = useResolvedPath(item.path);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <StyledLink to={item.path} color="#000" width="100%" closed={!open}>
        <Tooltip
          title={item.name}
          placement="right"
          open={!open && openTooltip === item.name}
          onClose={handleCloseTooltip}
          onOpen={() => handleOpenTooltip(item.name)}
        >
          <ListItem
            button
            key={item.path}
            onClick={() =>
              item.onClick ? item.onClick() : handleOnClickNavItem(item.path)
            }
            className={`list-item ${match ? "selected" : ""}`}
          >
            <ListItemIcon>
              <item.icon
                size={24}
                color={
                  match && !open ? theme.colors.primary : theme.colors.white
                }
              />
            </ListItemIcon>
            <ListItemText disableTypography primary={item.name} />
          </ListItem>
        </Tooltip>
      </StyledLink>
    );
  }

  return (
    <SidebarContainer
      className="sidebar-container"
      hidden={props.hidden}
      open={open}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: theme.colors.white,

          boxShadow: "none",
          height: 52,
        }}
      >
        <Topbar
          clean
          disableElevation
          bgColor={theme.colors.white}
          iconMarginLeft={24}
          IconElement={
            open ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerClose}
                  edge="start"
                >
                  <MdChevronLeft size={30} color={theme.colors.black} />
                </IconButton>
                <span style={{ color: "black" }}>{selectedItem.name}</span>
              </>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <MdChevronRight size={30} color={theme.colors.black} />
                </IconButton>
                <span style={{ color: "black" }}>{selectedItem.name}</span>
              </>
            )
          }
        />
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": { backgroundColor: theme.colors.black },
        }}
      >
        <DrawerHeader>
          <SidebarUserContainer>
            <DropdownMenu
              logout
              UserIcon={<UserIcon src={`${user.profile_image}`} />}
            />
            {open && <SidebarUserText>Olá, {user.first_name}</SidebarUserText>}
          </SidebarUserContainer>
        </DrawerHeader>
        <SidebarDivider marginTop={10} marginLeft={10} marginRight={10} />

        <SidebarListsContainer>
          <List className="sidebar-list-0">
            {primaryItemsList.map((item, index) => (
              <NavbarLinkItem item={item} key={index} open={open} />
            ))}
          </List>

          <List className="sidebar-list-1">
            <SidebarDivider marginLeft={10} marginRight={10} marginBottom={6} />
            {secondaryItemsList.map((item, index) => (
              <NavbarLinkItem item={item} key={index} open={open} />
            ))}
          </List>
        </SidebarListsContainer>
      </Drawer>

      <Box
        component="main"
        sx={{ height: "100%", flexGrow: 1, overflow: "hidden" }}
      >
        <DrawerHeader />
        {<RenderPage platform />}
      </Box>
    </SidebarContainer>
  );
}
