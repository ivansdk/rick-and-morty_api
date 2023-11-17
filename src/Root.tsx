import { Outlet } from 'react-router';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';


export const Root = () => {
  return (
    <div className="wrapper">
      <BurgerMenu />
      <Header />

      <div className="main">
          <Outlet />
      </div>

      <Footer />

    </div>
  );
};