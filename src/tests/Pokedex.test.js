import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe(
  'testa componente Pokedex', () => {
    const pokeNameTestId = 'pokemon-name';
    const isPokemonFavoriteByIdMock = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };

    it('testa se a página contem um h2 com o texto correto', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );
      const message = screen.getByRole('heading',
        { level: 2, name: /encountered/i });
      expect(message).toBeDefined();
    });

    it('testa se exibe o próximo pokémon ao clicar no botão próximo', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );
      const button = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(button).toBeDefined();
      const pokeName = screen.getByTestId(pokeNameTestId);

      pokemons.forEach((pokemon) => {
        expect(pokeName).toHaveTextContent(pokemon.name);
        userEvent.click(button);
      });
    });

    it('testa se é exibido apenas 1 pokémon', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );
      const visiblePokemon = screen.getAllByTestId(pokeNameTestId);
      expect(visiblePokemon).toHaveLength(1);
    });

    it('testa se existe um botão para cada tipo e o botão All é sempre visível', () => {
      const allTypes = [
        ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );

      const allButton = screen.getByRole('button', { name: /All/i });
      const typeButtons = screen.getAllByTestId('pokemon-type-button');

      typeButtons.forEach((button, index) => {
        expect(button).toHaveTextContent(allTypes[index]);
        expect(allButton).toBeDefined();
      });
    });

    it('testa se circula apenas pelos pokémon do tipo selecinado', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const typeButtons = screen.getAllByTestId('pokemon-type-button');

      typeButtons.forEach((button) => {
        userEvent.click(button);

        const currType = button.innerHTML;
        const pokemonOfThisType = pokemons.filter((pokemon) => pokemon.type === currType);
        const visiblePokemonType = screen.getByTestId('pokemon-type');

        expect(visiblePokemonType).toHaveTextContent(currType);

        pokemonOfThisType.forEach(() => {
          expect(visiblePokemonType).toHaveTextContent(currType);
          userEvent.click(nextButton);
        });

        // if (pokemonOfThisType.length > 1) {
        //   for (let ind = 0; ind < pokemonOfThisType.length; ind += 1);
        //   userEvent.click(nextButton);
        //   expect(visiblePokemonType).toHaveTextContent(currType);
        // }
      });
    });

    it('testa se a pokedex contém um botão para resetar o filtro', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />,
      );
      const allButton = screen.getByRole('button', { name: /All/i });
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const visiblePokemon = screen.getByTestId(pokeNameTestId);

      expect(allButton).toBeDefined();
      userEvent.click(allButton);
      pokemons.forEach((pokemon) => {
        expect(visiblePokemon).toHaveTextContent(pokemon.name);
        userEvent.click(nextButton);
      });
    });
  },
);
