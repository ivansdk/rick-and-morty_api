import { useSearchParams } from "react-router-dom";
import "./Search.scss";
import { getSearchWith } from "../../helpers/searchHelper";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";

import cn from 'classnames';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("name") || "";
  const [name, setName] = useState(query);
  const { currentTheme } = useAppSelector(state => state.theme)

  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchParams(getSearchWith(searchParams, { name: name, page: "1" }));
      }}
    >
      <input
        value={name}
        type="text"
        placeholder="Search for a character"
        className="search__input"
        onChange={(e) => setName(e.target.value)}
      />
      {name.length !== 0 && (
        <div
          className={cn("search__clear", {
            search__clear_white: currentTheme === "dark",
          })}
          onClick={() => {
            setName("");
            setSearchParams(
              getSearchWith(searchParams, { name: null, page: "1" })
            );
          }}
        >
        </div>
      )}
      <button className="btn search__btn">Search</button>
    </form>
  );
};
