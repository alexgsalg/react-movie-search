import { Button, Grid } from '@ui5/webcomponents-react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { IMovie } from '../../models/movies';
import {
  removeFavorite,
  selectFavorites,
} from '../../store/favorites/favorites.slice';
import style from './favorites.module.scss';

function FavoritesPage(): ReactElement {
  const favoritesList = useSelector(selectFavorites);
  const dispatch = useDispatch();

  // functions
  const onRemoveFavorite = (favorite: IMovie) => {
    if (!favorite) return;
    dispatch(removeFavorite(favorite?.imdbID));
  };

  return (
    <section className={style.favorites}>
      <div className={'container'}>
        <Grid
          defaultSpan="XL3 L4 M6 S12"
          hSpacing="1rem"
          position="Center"
          vSpacing="1rem">
          {favoritesList?.length ? (
            favoritesList.map((favorite, idx) => (
              <article key={idx} className={style.favorites_card}>
                <img
                  src={favorite?.Poster}
                  className={style.favorites_card__img}
                  alt="favorite?.Title"
                />
                <div className={style.favorites_card_body}>
                  <h5
                    className={
                      style.favorites_card__title + ' margin-bottom--sm'
                    }>
                    {favorite?.Title}
                  </h5>
                  <div className="d-flex justify-content--between align-items--center">
                    <small className="text-muted ">{favorite?.imdbID}</small>
                    <Button
                      className={style.favorites_card__button}
                      design="Negative"
                      icon="unfavorite"
                      iconEnd
                      onClick={() => onRemoveFavorite(favorite)}
                      type="Button"></Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <h1>No Movies favorites</h1>
          )}
        </Grid>
      </div>
    </section>
  );
}

export default FavoritesPage;
