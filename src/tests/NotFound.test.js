import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe(
  'testa componente NotFound', () => {
    it('testa se a página contem um h2 com o texto correto', () => {
      renderWithRouter(<NotFound />);
      const message = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });
      expect(message).toBeDefined();
    });

    it('testa se exibe a imagem correta', () => {
      renderWithRouter(<NotFound />);
      const image = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );
      expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
  },
);
