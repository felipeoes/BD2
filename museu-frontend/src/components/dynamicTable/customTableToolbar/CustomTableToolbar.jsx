import { useState, useContext } from "react";
import { useTheme } from "styled-components";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineFileDownload } from "react-icons/md";
import { ToolbarNumber, ToolbarText, ToolbarTitle } from "./styles";
import Button from "./../../button/Button";
import Loading from "./../../loading/Loading";
import AuthContext from "../../../contexts/auth";

export function CustomTableToolbar(props) {
  // const { state } = useContext(AuthContext);

  const {
    numSelected,
    platformName,
    buttonLoading,
    handleOnDownloadCSVLogs,
    handleOnDownloadRawLogs,
  } = props;
  const [openTooltip, setOpenTooltip] = useState(false);

  const styledTheme = useTheme();

  function disabledDownloadCSV() {
    return numSelected === 0 || buttonLoading.downloadCSV;
  }

  function disabledDownloadRaw() {
    return numSelected === 0 || buttonLoading.downloadRaw;
  }

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  return (
    <Toolbar
      sx={{
        width: "100%",
        justifyContent: "space-between",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        backgroundColor: styledTheme.colors.white,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
    >
      {numSelected && numSelected > 0 ? (
        <ToolbarText>
          <ToolbarNumber>{numSelected}</ToolbarNumber> logs selecionados
        </ToolbarText>
      ) : (
        <ToolbarTitle color={styledTheme.colors.semiblack80}>
          Logs do {platformName}
        </ToolbarTitle>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.children}

        <Tooltip
          title="Baixar os logs em json"
          placement="left"
          open={openTooltip}
          onClose={handleCloseTooltip}
          onOpen={handleOpenTooltip}
        >
          <IconButton
            loading={buttonLoading.downloadRaw}
            sx={{ marginRight: 2, marginLeft: 4 }}
            onClick={() => {
              handleCloseTooltip();
              handleOnDownloadRawLogs();
            }}
            disabled={disabledDownloadRaw()}
          >
            {buttonLoading.download ? (
              <Loading loadingSize={28} color={styledTheme.colors.primary} />
            ) : (
              <MdOutlineFileDownload
                size={28}
                color={styledTheme.colors.black60}
              />
            )}
          </IconButton>
        </Tooltip>

        <Button
          btnType="loading"
          disableElevation
          type="button"
          bgColor={styledTheme.colors.primary}
          fontFamily="InterSemiBold"
          width={160}
          height={32}
          fontSize={14}
          onClick={handleOnDownloadCSVLogs}
          disabled={disabledDownloadCSV()}
          loading={buttonLoading.upload}
        >
          Exportar como csv
        </Button>
      </div>
    </Toolbar>
  );
}

CustomTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
