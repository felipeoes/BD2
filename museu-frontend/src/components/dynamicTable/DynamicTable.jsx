import { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CustomTableHead } from "./customTableHead/CustomTableHead";
import { CustomTableToolbar } from "./customTableToolbar/CustomTableToolbar";
import LogRow from "../logRow/LogRow";
import Loading from "../loading/Loading";

export default function DynamicTable(props) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = props.rowsPerPage;
  const theme = useTheme();
  const maxHeight = props.maxHeight;
  let searchingValue = props.searchingValue;

  useEffect(() => {
    setLoading(true);
    setColumns(props.columns);
    setSelected([]);

    setRows([]);

    setTimeout(() => {
      setRows(props.rows);
      setLoading(false);
    }, 1000);
  }, [props.columns, props.rows]);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row);

      setSelected(newSelecteds);
      props.getSelected(newSelecteds);

      return;
    }

    setSelected([]);
    props.getSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    props.getSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function defaultLabelDisplayedRows({ from, to, count }) {
    return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
  }

  function defaultGetAriaLabel(type) {
    switch (type) {
      case "first":
        return "Ir para a primeira página";
      case "last":
        return "Ir para a última página";
      case "previous":
        return "Ir para a página anterior";
      default:
        return "Ir para a próxima página";
    }
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        backgroundColor: theme.colors.white,
      }}
    >
      {loading ? (
        <Loading loadingSize={50} marginTop={150} />
      ) : (
        <Paper
          sx={{
            width: "100%",
            border: "none",
            boxShadow: "none",
          }}
        >
          <CustomTableToolbar
            numSelected={selected?.length || 0}
            platformName={props?.platform || "AA"}
            buttonLoading={props?.buttonLoading}
            handleOnDownloadCSVLogs={props.handleOnDownloadCSVLogs}
            handleOnDownloadRawLogs={props.handleOnDownloadRawLogs}
          >
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage || -1}
              page={page}
              onPageChange={handleChangePage}
              labelDisplayedRows={defaultLabelDisplayedRows}
              getItemAriaLabel={defaultGetAriaLabel}
              sx={{
                "& .MuiButtonBase-root": {
                  color: "black",
                },
                "& .MuiButtonBase-root.Mui-disabled": {
                  opacity: 0.5,
                },
              }}
            />
          </CustomTableToolbar>

          <TableContainer
            sx={{
              maxHeight: maxHeight,
              backgroundColor: theme.colors.white,
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              style={{ maxHeight: maxHeight, overflow: "auto" }}
            >
              <CustomTableHead
                columns={columns}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody
                sx={{
                  "& .MuiTableRow-root.Mui-selected": {
                    backgroundColor: `rgba(0, 0, 0, 0.06) !important`,
                  },
                }}
              >
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return rows.length > 0 ? (
                      <LogRow
                        searchingValue={searchingValue}
                        key={row.id}
                        row={row}
                        columns={columns}
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        ariaChecked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        labelId={labelId}
                      />
                    ) : (
                      <h1>Sem dados desta tabela</h1>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}