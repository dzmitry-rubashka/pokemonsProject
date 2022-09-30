import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

const PokemonsList = () => {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonStats, setPokemonStats] = useState(null);
  const [currentPokemonName, setCurrentPokemonName] = useState("");

  useEffect(() => {
    try {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((result) => result.json())
        .then((pokemonsData) => setPokemonsList(pokemonsData.results));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickPokemon = (pokemon) => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((result) => result.json())
        .then((pokemonData) => {
          setPokemon(pokemonData);
          currentPokemonName === pokemonData.name
            ? setCurrentPokemonName("")
            : setCurrentPokemonName(pokemonData.name);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then((result) => result.json())
        .then((pokemonStatsData) => {
          setPokemonStats(pokemonStatsData);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        List of Pokemons
        {pokemonsList.map((pokemon, index) => (
          <div className={styles.pokemonCard} key={pokemon.name}>
            <div onClick={() => onClickPokemon(pokemon.name)}>
              <div>{pokemon.name}</div>
              <img
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
              />
            </div>
          </div>
        ))}
      </div>
      {currentPokemonName && (
        <div className={styles.allDetails}>
          <div className={styles.details}>
            Details
            <div className={styles.description}>
              <div>{pokemon.name}</div>
              <div>
                <img alt={pokemon.name} src={pokemon.sprites.back_default} />
              </div>
              {pokemonStats?.flavor_text_entries[8].flavor_text}
              <div className={styles.stats}>
                <div>HP - {pokemon.stats[0].base_stat}</div>
                <div>Attack - {pokemon.stats[1].base_stat}</div>
                <div>Defense - {pokemon.stats[2].base_stat}</div>
              </div>
            </div>
          </div>
          <div className={styles.additionalDetails}>
            Special Abilities
            <div className={styles.specialAbilities}>
              <div className={styles.stats}>
                <div>Special Attack - {pokemon.stats[3].base_stat}</div>
                <div>Special Defense - {pokemon.stats[4].base_stat}</div>
                <div>Speed - {pokemon.stats[5].base_stat}</div>
                <div>Base Happiness - {pokemonStats?.base_happiness}</div>
                <div>Capture Rate - {pokemonStats?.capture_rate}</div>
                <div>Color - {pokemonStats?.color.name}</div>
                <div>Gender Rate - {pokemonStats?.gender_rate}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonsList;
