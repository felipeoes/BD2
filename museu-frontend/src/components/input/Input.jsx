import { useState, useEffect } from "react";
import {
  MainContainer,
  InputContainer,
  StyledInput,
  Label,
  IconButtonContainer,
} from "./styles";
import { BiHide, BiShow } from "react-icons/bi";
import { useTheme } from "styled-components";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";

export default function Input({
  type,
  name,
  placeholder,
  autoFocus,
  width,
  height,
  color,
  bgColor,
  value,
  onChange,
  required,
  error,
  disabled,
  label,
  labelColor,
  lblFontSize,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  lblTop, // marginTop of label
  borderColor,
  iconColor,
}) {
  const [hasError, setHasError] = useState(error);
  const [isPassHidden, setIsPassHidden] = useState(true);
  const theme = useTheme();

  function handleOnClickHidePassIcon() {
    setIsPassHidden(!isPassHidden);
  }

  function handleOnRemoveError() {
    if (hasError) {
      setHasError(false);
    }
  }

  useEffect(() => {
    if (error) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [error]);

  return label ? (
    <MainContainer>
      <Label
        marginTop={lblTop}
        htmlFor={name}
        labelColor={labelColor}
        fontSize={lblFontSize}
      >
        {label}
      </Label>
      <InputContainer
        onClick={handleOnRemoveError}
        marginBottom={marginBottom}
        marginTop={marginTop}
        marginLeft={marginLeft}
        marginRight={marginRight}
        error={hasError}
      >
        {type === "password" ? (
          <StyledInput
            placeholder={placeholder}
            name={name}
            autoFocus={autoFocus}
            type={isPassHidden && type === "password" ? "password" : "text"}
            value={value}
            required={required}
            onChange={(e) => onChange(e)}
            width={width}
            height={height}
            color={color}
            bgColor={bgColor}
            borderColor={borderColor}
            disabled={disabled}
            error={hasError}
          />
        ) : (
          <StyledInput
            placeholder={placeholder}
            name={name}
            autoFocus={autoFocus}
            type={type}
            value={value}
            required={required}
            onChange={(e) => onChange(e)}
            width={width}
            height={height}
            color={color}
            bgColor={bgColor}
            borderColor={borderColor}
            disabled={disabled}
            error={hasError}
          />
        )}

        {type === "password" &&
          (isPassHidden ? (
            <IconButtonContainer
              type="button"
              onClick={handleOnClickHidePassIcon}
            >
              <IconButton size="small">
                <BiShow color={iconColor || theme.colors.black} />
              </IconButton>
            </IconButtonContainer>
          ) : (
            <IconButtonContainer
              type="button"
              onClick={handleOnClickHidePassIcon}
            >
              <IconButton size="small">
                <BiHide color={iconColor || theme.colors.black} />
              </IconButton>
            </IconButtonContainer>
          ))}
      </InputContainer>
    </MainContainer>
  ) : (
    <InputContainer
      onClick={handleOnRemoveError}
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      error={hasError}
    >
      <StyledInput
        placeholder={placeholder}
        name={name}
        autoFocus={autoFocus}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e)}
        width={width}
        height={height}
        color={color}
        bgColor={bgColor}
        borderColor={borderColor}
        disabled={disabled}
        error={hasError}
      />
      {type === "password" && isPassHidden ? (
        <IconButtonContainer onClick={handleOnClickHidePassIcon}>
          <BiShow color={theme.colors.black} />
        </IconButtonContainer>
      ) : (
        <IconButtonContainer onClick={handleOnClickHidePassIcon}>
          <BiHide color={theme.colors.black} />
        </IconButtonContainer>
      )}
    </InputContainer>
  );
}
