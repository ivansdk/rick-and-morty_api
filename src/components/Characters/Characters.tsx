import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CharactersGrid } from "../CharactersGrid/CharactersGrid";
import "./Characters.scss";
import { getMultipleCharacters } from "../../api/api";
import { Character } from "../../Types/Character";
import { Loader } from "../Loader/Loader";

export const Characters = () => {
  // const { data } = useAppSelector((state) => state.characters);

  function generateRandomNumbers(
    min: number,
    max: number,
    count: number
  ): number[] {
    const randomNumbers: number[] = [];
    const availableNumbers: number[] = Array.from(
      { length: max - min + 1 },
      (_, index) => min + index
    );

    for (let i = 0; i < count; i++) {
      if (availableNumbers.length === 0) {
        break;
      }

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomNumber = availableNumbers.splice(randomIndex, 1)[0];

      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  }

  const [characters, setCharacters] = useState<null | Character[]>(null);
  const [status, setStatus] = useState("");
  const randomCharactersId = generateRandomNumbers(1, 826, 6).join(",");

  useEffect(() => {
    setStatus("Loading");
    getMultipleCharacters(randomCharactersId)
      .then((characters) => setCharacters(characters))
      .catch(() => setStatus("Error"))
      .finally(() => {
        setStatus("Done")
      });
  }, []);


  return (
    <section className="characters">
      <div className="container">
        <p className="characters__title">Characters:</p>
        {characters === null && status === "Loading" && <Loader />}
        {characters === null && status === "Error" && (<p className="message_error">Somethings went wrong</p>)}
        {characters !== null && status === "Done" && (
          <CharactersGrid characters={characters} />
        )}
      </div>
    </section>
  );
};
