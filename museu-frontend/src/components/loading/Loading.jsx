import React from "react";
// import Lottie from "react-lottie";

import { useTheme } from "styled-components";

import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "./styles";

type Props = {
  active?: boolean;
  loadingSize?: number;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
};



export default function Loading({
  color,
  active = true,
  loadingSize,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
}: Props) {
  const theme = useTheme();

  return (
    <LoadingContainer
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {active && (
        <CircularProgress
          size={loadingSize}
          sx={{
            elevation: 10,
            color: color || theme.colors.primary,
          }}
        />
      )}
    </LoadingContainer>
    // <div
    //   style={{
    //     alignSelf: "center",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginLeft: marginLeft,
    //     marginRight: marginRight,
    //     marginTop: marginTop,
    //     marginBottom: marginBottom,
    //   }}
    // >

    // </div>
  );
}
