import { Location } from "../../Types/Character";
import "./Card.scss";
import { getCurrentEpisode } from "../../api/api";
import cn from "classnames";
import { useEffect, useState } from "react";

type Props = {
  img: string;
  name: string;
  species: string;
  liveStatus: string;
  location: Location;
  episodes: string[];
};

export const Card: React.FC<Props> = ({
  img,
  name,
  species,
  liveStatus,
  location,
  episodes,
}) => {
  const [episode, setEpisode] = useState<null | string>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("Loading...");
    getCurrentEpisode(
      episodes[0].replace("https://rickandmortyapi.com/api", "")
    )
      .then((data) => setEpisode(data.name))
      .catch(() => setStatus("Error"))
      .finally(() => setStatus("Done"));
  }, []);

  return (
    <div className="card">
      <img src={img} alt="" className="card__img" />

      <div className="card__info">
        <div className="card__name">{name}</div>
        <div className="card__type">{species}</div>
        <div
          className={cn("card__status", {
            card__status_alive: liveStatus === "Alive",
            card__status_dead: liveStatus === "Dead",
          })}
        >
          {liveStatus}
        </div>

        <div className="card__group">
          <div className="card__group-title">Last known location:</div>
          <div className="card__group-subtitle">{location.name}</div>
        </div>

        <div className="card__group">
          <div className="card__group-title">First seen in episode:</div>
          <div className="card__group-subtitle">
            {episode === null && status === "Loading" && status}
            {episode === null &&
              status === "Error" &&
              "Error, cannot fetch data"}
            {episode && status === "Done" && (episode)}
          </div>
        </div>
      </div>
    </div>
  );
};
