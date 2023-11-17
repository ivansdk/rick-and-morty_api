import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Root } from './Root';
import { HomePage } from './pages/HomePage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { CharactersPage } from './pages/CharactersPage/CharactersPage';
import { initCharacters, initEpisodes, initLocations } from './app/slices/generalDataSlice';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);

  // console.log(characters);

  useEffect(() => {
    if(theme.currentTheme === 'dark') {
      document.body.classList.add('dark');
    }else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    dispatch(initCharacters());
    dispatch(initLocations());
    dispatch(initEpisodes());
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<HomePage />} />
          <Route path='/characters' element={<CharactersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
