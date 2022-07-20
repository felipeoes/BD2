import React from "react";
import { ButtonContainer, LoadingButton } from "./styles";
import Loading from "../loading/Loading";

export default function Button({
  children,
  type,
  variant,
  border,
  bgColor,
  color,
  borderColor,
  disableElevation = true,
  disabled = false,
  height,
  width,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  fontWeight,
  fontFamily,
  fontSize,
  Icon,
  iconSize,
  iconColor,
  iconMt,
  iconMb,
  iconMl,
  iconMr,
  onClick,
  loading,
  btnType,
}) {
  return btnType === "loading" ? (
    <LoadingButton
      startIcon={Icon && <Icon size={iconSize} color={iconColor} />}
      loading={loading}
      type={type}
      loadingPosition="center"
      variant={border ? "outlined" : "contained"}
      sx={{
        borderColor: borderColor,
        backgroundColor: bgColor,
        color: color,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        fontSize: fontSize,
        height: height,
        width: width,
        border: border ? "1px solid" : "none",
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
      disabled={disabled}
      onClick={onClick}
      loadingIndicator={<Loading loadingSize={30} active={loading || false} />}
      disableElevation={disableElevation}
    >
      {!loading && children}
    </LoadingButton>
  ) : (
    <ButtonContainer
      type={type}
      sx={{
        borderColor: borderColor,
        backgroundColor: bgColor,
        color: color,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        fontSize: fontSize,
        height: height,
        width: width,
        border: border ? "1px solid" : "none",
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
      disableElevation={disableElevation}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      fontSize={fontSize}
      border={border}
      disabled={disabled}
      bgColor={bgColor}
      textColor={color}
      borderColor={borderColor}
      onClick={onClick}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      height={height}
      width={width}
    >
      {Icon && (
        <Icon
          size={iconSize}
          color={iconColor}
          style={{
            marginRight: iconMr,
            marginLeft: iconMl,
            marginBottom: iconMb,
            marginTop: iconMt,
          }}
        />
      )}

      {!loading && children}
    </ButtonContainer>
  );
}

// LoadingButton.propTypes = {
//   bgColor: PropTypes.string,
//   border: PropTypes.bool,
//   borderColor: PropTypes.string,
//   color: PropTypes.string,
//   marginLeft: PropTypes.number,
//   marginRight: PropTypes.number,
//   marginTop: PropTypes.number,
//   marginBottom: PropTypes.number,
//   fontWeight: PropTypes.string,
//   fontFamily: PropTypes.string,
//   fontSize: PropTypes.string,
//   iconSize: PropTypes.number,
//   iconColor: PropTypes.string,
//   onClick: PropTypes.func,
//   btnType: PropTypes.string,
// };

// ButtonContainer.propTypes = {
//   bgColor: PropTypes.string,
//   border: PropTypes.bool,
//   borderColor: PropTypes.string,
//   color: PropTypes.string,
//   marginLeft: PropTypes.number,
//   marginRight: PropTypes.number,
//   marginTop: PropTypes.number,
//   marginBottom: PropTypes.number,
//   fontWeight: PropTypes.string,
//   fontFamily: PropTypes.string,
//   fontSize: PropTypes.string,
//   iconSize: PropTypes.number,
//   iconColor: PropTypes.string,
//   onClick: PropTypes.func,
//   btnType: PropTypes.string,
// };

// Button.propTypes = {
//   bgColor: PropTypes.string,
//   border: PropTypes.bool,
//   borderColor: PropTypes.string,
//   color: PropTypes.string,
//   marginLeft: PropTypes.number,
//   marginRight: PropTypes.number,
//   marginTop: PropTypes.number,
//   marginBottom: PropTypes.number,
//   fontWeight: PropTypes.string,
//   fontFamily: PropTypes.string,
//   fontSize: PropTypes.string,
//   iconSize: PropTypes.number,
//   iconColor: PropTypes.string,
//   onClick: PropTypes.func,
//   btnType: PropTypes.string,
// };
