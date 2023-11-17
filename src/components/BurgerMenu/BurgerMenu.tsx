import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import "./BurgerMenu.scss";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as burgerMenuActions } from "../../app/slices/burgerMenuSlice";

export const BurgerMenu = () => {
  const { menuStatus } = useAppSelector((state) => state.burgerMenu);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  return (
    <div
      className={cn("menu", {
        menu_active: menuStatus,
      })}
    >
      <div className="menu__header">
        <div className="menu__logo">
          <Link to="/">
            <img className="logo" src="img/Logo.png" />
          </Link>
        </div>
        <div
          className={cn("menu__close", {
            menu__close_white: theme.currentTheme === "dark",
          })}
          onClick={() => {
            dispatch(burgerMenuActions.menuStatus(false));
          }}
        >
        </div>
      </div>

      <nav className="menu__nav">
        <ol className="menu__list">
          <li className="menu__item">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                cn("menu__link header__link", {
                  header__link_active: isActive,
                })
              }
              onClick={() => {
                dispatch(burgerMenuActions.menuStatus(false));
              }}
            >
              Home
            </NavLink>
          </li>

          <li className="menu__item">
            <NavLink
              to={"/characters"}
              className={({ isActive }) =>
                cn("menu__link header__link", {
                  header__link_active: isActive,
                })
              }
              onClick={() => {
                dispatch(burgerMenuActions.menuStatus(false));
              }}
            >
              Characters
            </NavLink>
          </li>
        </ol>
      </nav>

      <div className="menu__theme">
        <ThemeChanger />
      </div>
    </div>
  );
};
