import { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Checkbox from "../../checkbox/Checkbox";
import Tooltip from "@mui/material/Tooltip";

export function CustomTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const [columns, setColumns] = useState(props.columns);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const theme = useTheme();

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  return (
    <TableHead style={{ backgroundColor: `${theme.colors.white}` }}>
      <TableRow style={{ backgroundColor: `${theme.colors.white}` }}>
        <Tooltip title="Selecionar tudo" placement="top">
          <TableCell
            padding="checkbox"
            align="center"
            style={{ backgroundColor: `${theme.colors.white}` }}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all",
              }}
            />
          </TableCell>
        </Tooltip>
        {columns.map((headCol) => (
          <TableCell
            style={{ backgroundColor: `${theme.colors.white}` }}
            width={20}
            key={headCol.id}
            align={headCol.align}
            padding={headCol.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCol.id ? order : false}
          >
            {headCol.id !== "data" ? (
              <TableSortLabel
                active={orderBy === headCol.id}
                direction={orderBy === headCol.id ? order : "asc"}
                onClick={createSortHandler(headCol.id)}
              >
                {headCol.label}
                {orderBy === headCol.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <TableSortLabel
              // active={orderBy === headCol.id}
              // direction={orderBy === headCol.id ? order : "asc"}
              // onClick={createSortHandler(headCol.id)}
              >
                {headCol.label}
                {orderBy === headCol.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CustomTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};