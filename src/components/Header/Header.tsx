import cn from "classnames";

import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as burgerMenuActions } from "../../app/slices/burgerMenuSlice";

export const Header = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <div className="header__right-bar">
        <div className="header__logo">
          <Link to="/">
            <img className="logo" src="img/Logo.png" />
          </Link>
        </div>

        <nav className="header__nav">
          <ol className="header__list">
            <li className="header__item">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  cn("header__link", {
                    header__link_active: isActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink
                to={"/characters"}
                className={({ isActive }) =>
                  cn("header__link", {
                    header__link_active: isActive,
                  })
                }
              >
                Characters
              </NavLink>
            </li>
          </ol>
        </nav>
      </div>

      <div className="header__left-bar">
        <div className="header__theme">
          <ThemeChanger />
        </div>

        <div
          className={cn("header__burger", {
            header__burger_white: theme.currentTheme === "dark",
          })}
          onClick={() => {
            dispatch(burgerMenuActions.menuStatus(true));
          }}
        ></div>
      </div>
    </div>
  );
};
