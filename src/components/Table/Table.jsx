import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo
  } from "react";
  import "./Table.css";
  import ReactPaginate from "react-paginate";
  import Dropdown from "../DropDown/Dropdown";
import Utils from "../../utils";
import axios from "axios";
import { ICON } from "../../utils/icon";
  
  const TableComponent = ({ tableData }) => {
    const [data, setData] = useState(tableData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState(tableData.autoSuggestion);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const [sortBy, setSortBy] = useState();
    const [order, setOrder] = useState();
    const [isLoadingExport, setIsLoadingExport] = useState(false);
  
    console.log(tableData);
    const debounce = (func, delay) => {
      let debounceTimer;
      return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
      };
    };
  
    const generateSuggestions = useCallback((rows) => {
      if (!rows) return;
      const uniqueSuggestions = new Set();
      rows.forEach((row) => {
        let count = 0;
        Object.values(row).forEach((value) => {
          if (count >= 4) return; // Limit to four objects
          if (
            value &&
            typeof value === "object" &&
            value.suggestionValue &&
            value.type !== "hidden" &&
            !value.removeFromAutoSuggestion
          ) {
            uniqueSuggestions.add(value.suggestionValue.toString());
          } else if (
            value &&
            typeof value === "object" &&
            value.value &&
            value.type !== "hidden" &&
            !value.removeFromAutoSuggestion
          ) {
            uniqueSuggestions.add(value.value.toString());
          } else if (
            value &&
            value.type !== "hidden" &&
            !value.removeFromAutoSuggestion
          ) {
            uniqueSuggestions.add(value.toString());
          }
          count++;
        });
      });
      setSuggestions(Array.from(uniqueSuggestions));
    }, []);
  
    const fetchPageData = useCallback(
      async (page, limit, sortBy, order, searchText) => {
        setIsLoading(true);
        setError(null);
        let params = { sortBy, order }
        if(searchText)
        {
          params.searchText = searchText;
        }
        try {
          const response = await axios.get(
            data.paginationUrl.replace("input", page).replace("count", limit),
            {
              params,
            }
          );
          const newData = { ...data.getTableData(response.data) };
          setData(newData);
          generateSuggestions(newData.rows);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setIsLoading(false);
        }
      },
      [data, generateSuggestions]
    );
  
    useEffect(() => {
      if (tableData?.rows) {
        setData(tableData);
        generateSuggestions(tableData.rows);
      }
    }, [tableData, generateSuggestions]);
  
    useEffect(() => {
      fetchPageData(currentPage, itemsPerPage, sortBy, order, searchText);
    }, [currentPage, itemsPerPage, sortBy, order]);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const fetchSuggestions = useMemo(
      () =>
        debounce(async (searchText) => {
          setError(null);
          try {
            if (data?.autoSuggestionUrl) {
              const result = await axios.get(
                data?.autoSuggestionUrl.replace("inputText", searchText)
              );
              setSuggestions(result.data.data || []);
            } else {
              setSuggestions([]);
            }
          } catch (err) {
            setError("Failed to fetch suggestions");
          }
        }, 1000),
      [data?.autoSuggestionUrl]
    );
  
    const handleSuggestionClick = useCallback(
      (suggestion) => {
        setSearchText(suggestion);
        fetchPageData(currentPage, itemsPerPage, sortBy, order, suggestion);
        setShowSuggestions(false);
      },
      [currentPage, itemsPerPage, sortBy, order, fetchPageData]
    );
  
    const handleSearchClick = useCallback(() => {
      setShowSuggestions(true);
    }, []);
  
    const handleExportClick = () => {
      setIsLoadingExport(true);
      setTimeout(() => {
        setIsLoadingExport(false);
      }, 4000);
    };
  
    const handleExport = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (err) {
        setError("Failed to export data");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handlePrint = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (err) {
        setError("Failed to print data");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleReset = () => {
      setSearchText("");
      setCurrentPage(1);
      fetchPageData(1, itemsPerPage, sortBy, order, "");
    };
  
    const handleInputChange = useCallback(
      (event) => {
        setSearchText(event.target.value);
        if (event.target.value.length > 0) {
          fetchSuggestions(event.target.value);
        }
      },
      [fetchSuggestions]
    );
  
    const handleItemsPerPageChange = useCallback((event) => {
      setItemsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(1);
    }, []);
  
    const getCurrentItemRange = useCallback(() => {
      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, data.totalItemCount);
      return `${start} to ${end}`;
    }, [currentPage, itemsPerPage, data.totalItemCount]);
  
    const handlePageClick = useCallback((event) => {
      setCurrentPage(event.selected + 1);
    }, []);
  
    const handleSort = useCallback(
      (headerItem) => {
        const newOrder =
          sortBy === headerItem && order === "asc" ? "desc" : "asc";
        setSortBy(headerItem);
        setOrder(newOrder);
      },
      [sortBy, order]
    );
  
    const getSortIcon = useCallback(
      (headerItem) => {
        if (sortBy !== headerItem) return <span></span>;
        return order === "asc" ? <span>↑</span> : <span>↓</span>;
      },
      [sortBy, order]
    );
  
    if (!tableData?.rows) {
      return null;
    }
  
    const shouldHideAction = (action, row) => {
      if (action.hiddenConditions) {
        return action.hiddenConditions.some((condition) => {
          const cell = row[condition.key];
          const cellValue = cell?.originalValue || cell.value;
          return condition.negate
            ? !condition.value.includes(cellValue)
            : condition.value.includes(cellValue);
        });
      }
      return false;
    };
  
    return (
      <>
        {data?.row?.length == 0 ? (
          ICON.LOADING
        ) : (
          <div className="table-container">
            <div className="table-heading">
              {data.title && <h2>{data.title}</h2>}
  
              <div className="search_export_print_container">
                {data.searchBar && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      fetchPageData(
                        currentPage,
                        itemsPerPage,
                        sortBy,
                        order,
                        searchText
                      );
                    }}
                    ref={searchRef}
                    className="search-container"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={handleInputChange}
                      onClick={handleSearchClick}
                      className="search-bar"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </form>
                )}
  
                <div className="utility-buttons">
                  {data.reset && (
                    <button onClick={handleReset} className="reset">
                      {ICON.RESET}
                      Reset
                    </button>
                  )}
                  {data.exportDataUrl && (
                    <div>
                      <a
                        download
                        href={`${Utils.appendTokenToUrl(
                          data.exportDataUrl,
                          Utils.getToken()
                        )}`}
                        onClick={
                          isLoadingExport
                            ? (e) => e.preventDefault()
                            : handleExportClick
                        }
                      >
                        <button className="export">
                          {isLoadingExport ? (
                            <p
                              style={{
                                paddingInline: "1.5rem",
                                margin: "0",
                                paddingBlock: "0rem",
                              }}
                            >
                              {ICON.DOWNLOAD_LOADING}
                            </p>
                          ) : (
                            <>
                              {ICON.EXPORT}
                              Export
                            </>
                          )}
                        </button>
                      </a>
                    </div>
                  )}
                  {data.printUrl && (
                    <a
                      download={"Employee List"}
                      href={`${Utils.appendTokenToUrl(
                        data.printUrl,
                        Utils.getToken()
                      )}`}
                    >
                      <button className="print">
                        {ICON.PRINT}
                        Print
                      </button>
                    </a>
                  )}
  
                  {data.allAction && (
                    <button onClick={data.allAction} className="all_action">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 21q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 12t.713-3.512t1.924-2.85t2.85-1.925T12 3v2Q9.075 5 7.038 7.038T5 12t2.038 4.963T12 19zm4-4l-1.4-1.425L17.175 13H9v-2h8.175L14.6 8.4L16 7l5 5z"
                        />
                      </svg>
                      Action
                    </button>
                  )}
                </div>
              </div>
            </div>
  
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
  
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(data.rows && data.rows[0] ? data.rows[0] : {}).map(
                    (headerItem, index) => {
                      return (
                        data.rows[0]?.[headerItem].type !== "hidden" && (
                          <th
                            key={index}
                            onClick={() =>
                              tableData.sorting &&
                              handleSort(data.rows[0]?.[headerItem].key)
                            }
                          >
                            {headerItem}{" "}
                            {tableData.sorting &&
                              getSortIcon(data.rows[0]?.[headerItem].key)}
                          </th>
                        )
                      );
                    }
                  )}
                  {data.action && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
              {data.rows && data.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(row).map(([key, cell], cellIndex) => 
                      cell.type !== "hidden" && (
                        <td data-cell={key} key={cellIndex}>
                          {cell.viewAs ? (
                            cell.value ? (
                              cell.type === "file" ? (
                                <span
                                  style={{ cursor: "pointer", color: "blue" }}
                                  onClick={() => Utils.handleViewFile(cell.value)}
                                >
                                  {cell.viewAs}
                                </span>
                              ) : (
                                <a
                                  style={{ cursor: "pointer", color: "blue" }}
                                  href={cell.value?.startsWith("http")
                                    ? cell.value
                                    : "http://"+cell.value}
                                  target="_blank"
                                >
                                  {cell.viewAs}
                                </a>
                              )
                            ) : "-----"
                          ) : cell.value}
                        </td>
                      )
                    )}
                    {data.action && (
                      <td data-cell="Action">
                        <Dropdown
                          trigger={<span>{ICON.DOT_MENU}</span>}
                          content={data.actionData.map((action, actionIndex) => 
                            !shouldHideAction(action, row) && (
                              <p
                                key={actionIndex}
                                onClick={() => action.functions(row[action.Id]?.value)}
                                className=""
                                title={action.label}
                              >
                                {ICON[action.name.toUpperCase()]} {action.label}
                              </p>
                            )
                          )}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
  
            {data.pagination && (
              <div className="pagination_container">
                <div>
                  <p className="m-0">
                    Showing {getCurrentItemRange()} of {data.totalItemCount}{" "}
                    Entries
                  </p>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
  
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={data.totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  forcePage={currentPage - 1}
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  };
  
  export default React.memo(TableComponent);
  