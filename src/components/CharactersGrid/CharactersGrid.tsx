import { useEffect } from "react";
import { Character } from "../../Types/Character";
import { Card } from "../Card/Card";
import "./CharactersGrid.scss";

type Props = {
  characters: Character[];
};

export const CharactersGrid: React.FC<Props> = ({ characters }) => {
  const isArray = Array.isArray(characters);

  return (
    <div className="characters-grid">
      {!isArray && (<p>There is nothing here</p>)}
      {isArray &&
        characters.map((character) => (
          <Card
            key={character.id}
            img={character.image}
            name={character.name}
            species={character.species}
            liveStatus={character.status}
            location={character.location}
            episodes={character.episode}
          />
        ))}
    </div>
  );
};
