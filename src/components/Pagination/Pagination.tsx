import cn from "classnames";
import "./Pagination.scss";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/searchHelper";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const pages = Math.ceil(total / perPage);

  const pageArr = [];

  for (let i = 0; i < pages; i += 1) {
    pageArr.push(i + 1);
  }

  const renderPageNumbers = () => {
    if (pages <= 1) {
      return null;
    }

    const pageNumbers = [];
    const visiblePages = 2;

    for (let i = 1; i <= pages; i += 1) {
      if (
        i === 1 ||
        i === pages ||
        (i >= currentPage - visiblePages && i <= currentPage + visiblePages)
      ) {
        pageNumbers.push(i);
      }
    }

    let prevPage: null | number = null;

    return pageNumbers.map((page) => {
      const pageElements = [];

      if (prevPage !== null && page - prevPage > 1) {
        pageElements.push(
          <li key={`ellipsis-${prevPage + 1}`} className="pagination__item">
            ...
          </li>
        );
      }

      pageElements.push(
        <li
          key={page}
          className={cn("pagination__item", {
            pagination__item_active: page === currentPage,
          })}
        >
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: `${page}`,
              }),
            }}
            onClick={() => {
              if (currentPage !== page) {
                window.scrollTo(0, 0);
              }
            }}
          >
            {page}
          </Link>
        </li>
      );

      prevPage = page;

      return pageElements;
    });
  };
  
  return (
    <>
      {pageArr.length > 1 && (
        <ul className="pagination">
          <li
            className={cn("pagination__item pagination__item_arrow-left", {
              pagination__item_disabled: currentPage === 1,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: `${currentPage - 1}`,
                }),
              }}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {"<"}
            </Link>
          </li>

          {renderPageNumbers()}

          <li
            className={cn("pagination__item pagination__item_arrow-right", {
              pagination__item_disabled: currentPage === pages,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: `${currentPage + 1}`,
                }),
              }}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {">"}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};
