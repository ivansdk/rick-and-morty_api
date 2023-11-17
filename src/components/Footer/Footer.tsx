import { useAppSelector } from '../../app/hooks';
import './Footer.scss';

export const Footer = () => {
  const { character, location, episode } = useAppSelector(state => state.generalData);

  return (
    <section className="footer">
      <div className="footer__top">
        <div className="footer__info">
          <span>Characters: {!character.status && (character.count)}</span>
          <span>Locations: {!location.status && (location.count)}</span>
          <span>Episodes:  {!episode.status && (episode.count)}</span>
        </div>
      </div>
      <div className="footer__bottom">Created by Ivan Sydorenko</div>
    </section>
  );
};