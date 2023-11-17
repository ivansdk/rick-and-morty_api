import cn from "classnames";

import "./ThemeChanger.scss";
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Theme, actions as themeActions } from '../../app/slices/themeSlice';
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const ThemeChanger = () => {
  const theme = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const [storeTheme, setStoreTheme] = useLocalStorage<Theme>('thme', 'light');

  useEffect(() => {
    dispatch(themeActions.changeTheme(storeTheme))
  }, [storeTheme])

  return (
    <div
      className={cn("theme", {
        theme_dark: theme.currentTheme === 'dark',
      })}
      onClick={() => {
        if(theme.currentTheme === 'light') {
          dispatch(themeActions.changeTheme('dark'));
          setStoreTheme('dark');
        }else {
          dispatch(themeActions.changeTheme('light'));
          setStoreTheme('light');
        }
      }}
    >

      <div className="theme__svg theme__svg-right"></div>
      <div className="theme__svg theme__svg-left"></div>

    </div>
  );
};
