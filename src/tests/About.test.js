import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe(
  'testa componente About', () => {
    it('testa se a página contém um heading com o texto "about pokedéx"', () => {
      renderWithRouter(<About />);
      const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
      expect(heading).toBeDefined();
    });

    it('testa se a página contém um heading com o texto "about pokedéx"', () => {
      renderWithRouter(<About />);
      const firstParagraph = screen.getByText(/This application simulates a Pokédex/i,
        { selector: 'p' });
      const secondParagraph = screen.getByText(/One can filter Pokémons by type/i,
        { selector: 'p' });
      expect(firstParagraph).toBeDefined();
      expect(secondParagraph).toBeDefined();
    });

    it('testa se a página contém a imagem da pokedéx"', () => {
      renderWithRouter(<About />);
      const image = screen.getByRole('img');
      expect(image).toBeDefined();
      expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
  },
);
