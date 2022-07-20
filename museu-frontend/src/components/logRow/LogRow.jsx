import { useState, Fragment } from "react";
import { useTheme } from "styled-components";

import { IconButton, TableRow, TableCell, Collapse } from "@mui/material";

import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

import Checkbox from "../checkbox/Checkbox";

export default function LogRow({
  columns,
  row,
  selected,
  role,
  ariaChecked,
  tabIndex,
  hover,
  labelId,
  onClick,
  searchingValue,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hiddenText, setHiddenText] = useState(true);

  const columnsKeys = Object.keys(columns).map((key) => columns[key].id);

  function format_date(date) {
    let d = "";
    // data está no formato US
    const splittedDate = date.split("-");
    const year = splittedDate[0];
    d = new Date(year, splittedDate[1]-1, splittedDate[2].substring(0,2));
    
    return d.toLocaleString("pt-BR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  function onClickText() {
    setHiddenText(!hiddenText);
  }

  function getHighlightedText(text, highlight) {
    const parts = text.toString().split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  }

  return (
    <Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
        selected={selected}
        role={role}
        aria-checked={ariaChecked}
        tabIndex={tabIndex}
        hover={hover}
      >
        <TableCell padding="checkbox" align="center">
          <Checkbox
            checked={selected}
            onChange={(event) => onClick(event, row.id)}
          />
        </TableCell>

        {columnsKeys.map((key, index) => {
          if (key === "id") {
            return (
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                align="center"
                key={row[key]}
              >
                {searchingValue
                  ? getHighlightedText(row[key], searchingValue)
                  : row[key]}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={key + index}
                align="left"
                component="th"
                id={labelId}
                scope="row"
                // size="small"
                sx={{ overflow: "hidden" }}
                onClick={onClickText}
              >
                <div
                  style={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: hiddenText ? 120 : "auto",
                    overflow: hiddenText ? "hidden" : "visible",
                    WebkitLineClamp: hiddenText ? 2 : "auto",
                    display: hiddenText ? "-webkit-box" : "block",
                    WebkitBoxOrient: hiddenText ? "vertical" : "horizontal",
                  }}
                >
                  <span
                    style={{
                      overflow: hiddenText ? "hidden" : "visible",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {key === "criado_em" ? format_date(row[key]) : row[key]}
                  </span>
                </div>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </Fragment>
  );
}
