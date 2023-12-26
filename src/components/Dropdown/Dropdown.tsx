import cn from "classnames";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import { Link, useSearchParams } from "react-router-dom";
import { Option } from "../../Types/Options";
import { getSearchWith } from "../../helpers/searchHelper";

type Props = {
  title: string;
  selectType: string;
  currentOption: string;
  options: Option[];
};

export const Dropdown: React.FC<Props> = ({
  title,
  selectType,
  currentOption,
  options,
}) => {
  const [searchParams] = useSearchParams();
  const [dropdowActive, setDropdowActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const currentTitle =
    options.filter((option) => option.value === currentOption)[0]?.label || "";

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdowActive(false);
    }
  }, []);

  useEffect(() => {
    if(!dropdowActive) {
      return;
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdowActive]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <div className="dropdown__title">{title}</div>

      <div className="dropdown__wrapper">
        <button
          type="button"
          className="dropdown__trigger"
          onClick={() => {
            setDropdowActive(!dropdowActive);
          }}
        >
          {currentTitle !== "" ? (
            <span>{currentTitle}</span>
          ) : (
            <span>Choose option</span>
          )}

          <span
            className={cn("dropdown__icon", {
              dropdown__icon_active: dropdowActive,
            })}
          >
            &#10148;
          </span>
        </button>

        <div
          className="dropdown__menu"
          style={{ display: dropdowActive ? "block" : "none" }}
        >
          <div className="dropdown__content">
            {options.map((option) => (
              <Link
                key={option.label}
                to={{
                  search: getSearchWith(searchParams, {
                    [selectType]: option.value,
                    page: "1",
                  }),
                }}
                className="dropdown__item"
                onClick={() => {
                  setDropdowActive(false);
                }}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
