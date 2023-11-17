import { useSearchParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Search } from "../../components/Search/Search";

import "./CharactersPage.scss";
import { CharactersGrid } from "../../components/CharactersGrid/CharactersGrid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { initCharacters } from "../../app/slices/charactersSlice";
import { Pagination } from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader/Loader";


export const CharactersPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.characters);

  const status = searchParams.get("status") || "all";
  const species = searchParams.get("species") || "all";
  const page = searchParams.get("page") || 1;
  const name = searchParams.get("name") || "";

  useEffect(() => {
    dispatch(initCharacters({ page, status, species, name }));
  }, [page, status, species, name]);

  return (
    <section className="characters">
      <div className="container">
        <div className="filters">
          <Search />

          <div className="filters__dropdowns">
            <Dropdown
              title="Sort by live status"
              selectType="status"
              options={[
                { label: "All", value: "all" },
                { label: "Alive", value: "alive" },
                { label: "Dead", value: "dead" },
                { label: "Unknown", value: "unknown" },
              ]}
              currentOption={status}
            />
            <Dropdown
              title="Sort by species"
              selectType="species"
              options={[
                { label: "All", value: "all" },
                { label: "Alien", value: "alien" },
                { label: "Animal", value: "animal" },
                { label: "Cronenberg", value: "cronenberg" },
                { label: "Disease", value: "disease" },
                { label: "Human", value: "human" },
                { label: "Humanoid", value: "humanoid" },
                { label: "Mythological ", value: "mythological creature" },
                { label: "Poopybutthole", value: "poopybutthole" },
                { label: "Robot", value: "robot" },
                { label: "Unknown", value: "unknown" },
              ]}
              currentOption={species}
            />

          </div>
        </div>

        <div className="characters__grid-wrapper">
          {error && <p className="message_error">Something went wrong</p>}
          {loading && <Loader />}
          {data.results && !loading && !error && (
            <CharactersGrid characters={data.results} />
          )}
          {!data.results && !loading && !error && (
            <p className="message">There is nothing here</p>
          )}
        </div>
        {data.info && !loading && (
          <div className="characters__pagination">
            <Pagination
              total={data.info.count}
              perPage={20}
              currentPage={+page}
            />
          </div>
        )}
      </div>
    </section>
  );
};
