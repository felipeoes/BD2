import { useState } from "react";
// import HorizontalList from "../horizontalList/HorizontalList";
import { FilterContainer, SearchFilterButtonsContainer } from "./styles";
import SearchFilter from "./../searchFilter/SearchFilter";
export default function Filter({
  columns,
  filteringRows,
  setFilteredRows,
  searchValue,
  setSearchingValue,
  langOptions,
  disabled,
}) {
  const [rows, setRows] = useState(filteringRows);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  function format_prog_language(prog_language) {
    return prog_language.split(" ")[0].replace(/[0-9]/g, "");
  }
  const requestSearch = (searchValue, startDate, endDate, filterRequest) => {
    let targetRows = filteringRows;

    if (filterRequest) {
      targetRows = rows;
    }

    if (startDate) {
      const filteredRows = targetRows.filter((row) => {
        let submission_date = new Date(
          row.date_submitted.split(" ")[0].split("/").reverse().join("/")
        );
        return submission_date >= startDate && submission_date <= endDate;
      });

      setRows(filteredRows);
      setFilteredRows(filteredRows);
    } else if (searchValue) {
      let filteredRows = null;

      if (typeof searchValue === "object") {
        filteredRows = targetRows.filter((row) => {
          return Object.keys(row).some((field) => {
            return field !== "source_code" && field === "prog_language"
              ? searchValue.includes(format_prog_language(row[field]))
              : searchValue.includes(row[field].toString());
          });
        });
      } else {
        setSearchingValue(searchValue);

        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        filteredRows = targetRows.filter((row) => {
          return Object.keys(row).some((field) => {
            return (
              field !== "source_code" && searchRegex.test(row[field].toString())
            );
          });
        });
      }

      setFilteredRows(filteredRows);
      setRows(filteredRows);
    } else {
      setSearchingValue("");
      setRows(filteringRows);
      setFilteredRows(filteringRows);
    }
  };

  return (
    <FilterContainer>
      <SearchFilterButtonsContainer>
        <SearchFilter
          placeholder="Buscar ID"
          value={searchValue}
          onChange={(e) => requestSearch(e.target.value)}
          clearSearch={() => setSearchingValue("")}
          disabled={disabled}
        />
      </SearchFilterButtonsContainer>
    </FilterContainer>
  );
}
