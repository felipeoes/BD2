import { AppBar as MuiAppBar, Toolbar } from "@mui/material";

type Props = {
  children?: React.ReactNode,
  bottom: boolean,
  bgColor?: string,
  disableShadow?: boolean,
};

export default function AppBar({
  bottom,
  children,
  bgColor,
  disableShadow,
}: Props) {
  return (
    <MuiAppBar
      position="sticky"
      style={{
        backgroundColor: bgColor || "#fff",
        boxShadow: disableShadow ? "none" : "",
      }}
      sx={{
        top: bottom ? "auto" : 0,
        bottom: bottom ? 0 : "auto",
      }}
    >
      <Toolbar>{children}</Toolbar>
    </MuiAppBar>
  );
}
