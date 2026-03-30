import "./SearchResults.css";
import { SearchResultLine } from "./SearchResultLine";
import { useEffect, useMemo, useState } from "react";

type Props = {
  results: string[];
};

const RESULTS_PER_PAGE = 4;

export const SearchResults = ({ results }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  const currentResults = useMemo(() => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    return results.slice(start, end);
  }, [results, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {results.length !== 0 ? (
        <div className="results-list">
          <div className="add-info">
            Знайдено {results.length} результатів
          </div>

          {currentResults.map((result, index) => (
            <SearchResultLine
              result={result}
              key={(currentPage - 1) * RESULTS_PER_PAGE + index}
            />
          ))}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Назад
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={page === currentPage ? "active-page" : ""}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Далі
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};