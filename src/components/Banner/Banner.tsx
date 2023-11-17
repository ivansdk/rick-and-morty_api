import cn from "classnames";

import "./Banner.scss";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

export const Banner = () => {
  const theme = useAppSelector(state => state.theme);

  return (
    <section className={cn("banner", {
      banner_dark: theme.currentTheme === 'dark',
    })}>
      <div className="container banner__container">
        <p className="banner__title">Rick and Morty API</p>
        <Link to={'/characters'} className="btn btn_link">Search</Link>
      </div>
    </section>
  );
};
