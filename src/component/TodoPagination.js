import React from "react";

const Pagination = ({ todosPerPage, totalTodos, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="buttonfilter"
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        {"<"}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`buttonfilter ${
            currentPage === number ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}
      <button
        className="buttonfilter"
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
