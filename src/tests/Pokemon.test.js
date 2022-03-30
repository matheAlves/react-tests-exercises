import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

describe(
  'testa componente Pokemon', () => {
    const pokemonMock = {
      id: 10,
      name: 'Caterpie',
      type: 'Bug',
      averageWeight: {
        value: '2.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 30',
          map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
        },
        {
          location: 'Johto Route 31',
          map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
        },
        {
          location: 'Ilex Forest',
          map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
        },
        {
          location: 'Johto National Park',
          map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
        },
      ],
      summary: 'For protection, it releases a horrible stench from its antennae',
    };
    it('testa se todas as informações são renderizadas corretamente', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />);

      const { averageWeight: { value, measurementUnit } } = pokemonMock;

      const nameOnScreen = screen.getByTestId('pokemon-name');
      expect(nameOnScreen).toHaveTextContent(pokemonMock.name);

      const typeOnScreen = screen.getByTestId('pokemon-type');
      expect(typeOnScreen).toHaveTextContent(pokemonMock.type);

      const weightOnScreen = screen.getByTestId('pokemon-weight');
      expect(weightOnScreen).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

      const imageOnScreen = screen.getByAltText(`${pokemonMock.name} sprite`);
      expect(imageOnScreen).toBeDefined();
      expect(imageOnScreen).toHaveAttribute('src', `${pokemonMock.image}`);
    });

    it('testa funcionamento do link "More details"', () => {
      const { history } = renderWithRouter(<Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />);

      const link = screen.getByRole('link', { name: /More details/i });
      expect(link).toBeDefined();

      userEvent.click(link);
      const { pathname } = history.location;
      const details = screen.findByText(pokemonMock.summary);
      expect(details).toBeDefined();
      expect(pathname).toBe(`/pokemons/${pokemonMock.id}`);
    });

    it('testa se existe um icone de estrela nos pokemon favoritados', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />);

      const starIcon = screen.getByAltText(`${pokemonMock.name} is marked as favorite`);
      expect(starIcon).toBeDefined();
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    });
  },
);
