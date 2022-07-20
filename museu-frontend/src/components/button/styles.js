import { styled as muiStyled } from "@mui/material/styles";
import LdButton from "@mui/lab/LoadingButton";
import Button, { ButtonProps } from "@mui/material/Button";

export const LoadingButton = muiStyled(LdButton)((props) => ({
  display: "flex",
  border: props.border ? `1px solid ${props.borderColor}` : "none",

  borderRadius: 4,
  width: props.width || 465,
  height: props.height || 40,

  marginLeft: props.marginLeft || 0,
  marginRight: props.marginRight || 0,
  marginTop: props.marginTop || 0,
  marginBottom: props.marginBottom || 0,

  fontFamily: props.fontFamily || "InterSemiBold",
  fontStyle: props.fontStyle || "normal",
  fontSize: props.fontSize || 16,
  fontWeight: props.fontWeight || "600",
  textTransform: "none",
  textAlign: "center",
  padding: props.padding || 0,

  color: props.textColor || "#F2F2F2",
  backgroundColor: props.bgColor || "transparent",

  "&:hover": {
    opacity: 0.8,
    backgroundColor: props.bgColor,
    borderColor: props.border && props.borderColor,
  },
  "&:disabled ": {
    opacity: 0.3,
    backgroundColor: "#8C8C8C",
    cursor: "not-allowed",
    fontWeight: "bold",
    pointerEvents: "none",

    "&:hover": {
      opacity: 0.4,
    },
  },
}));

export const ButtonContainer = muiStyled(LdButton)((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  border: props.border ? `1px solid ${props.borderColor}` : "none",

  borderRadius: 4,

  width: props.width || 465,
  height: props.height || 40,

  marginLeft: props.marginLeft || 0,
  marginRight: props.marginRight || 0,
  marginTop: props.marginTop || 0,
  marginBottom: props.marginBottom || 0,

  fontFamily: props.fontFamily || "InterSemiBold",
  fontStyle: props.fontStyle || "normal",
  fontSize: props.fontSize || 16,
  fontWeight: props.fontWeight || "600",
  textTransform: "none",

  padding: props.padding || 0,

  color: props.textColor || "#F2F2F2",
  backgroundColor: props.bgColor || "transparent",

  cursor: "pointer",

  "&:hover": {
    opacity: 0.8,
    backgroundColor: props.bgColor,
    borderColor: props.border && props.borderColor,
  },
  "&:disabled ": {
    opacity: 0.3,
    backgroundColor: "#8C8C8C",
    color: "black",
    fontWeight: "bold",
    cursor: "not-allowed",
    pointerEvents: "none",

    "&:hover": {
      opacity: 0.4,
    },
  },
}));
