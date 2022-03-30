import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe(
  'testa componente FavoritePokemons', () => {
    it('testa se é exibida mensagem correta se não houver favoritos', () => {
      renderWithRouter(<FavoritePokemons />);
      const message = screen.getByText(/No favorite pokemon found/i);
      expect(message).toBeDefined();
    });

    it('testa se é exibido todos os cards de  favoritos', () => {
      const length = 9;
      renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
      const favPokemon = screen.getAllByTestId('pokemon-name');
      expect(favPokemon).toHaveLength(length);
    });
  },
);
