import { Button } from '@ui5/webcomponents-react';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './movie-result.module.scss';
// store
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from '../../store/favorites/favorites.slice';
import { AppDispatch } from '../../store/store';
// interface
import { useSelector } from 'react-redux';
import { IMovie } from '../../models/movies';
// imports

interface IMovieResult {
  isLoading: boolean;
  movie: IMovie | null;
}

function MovieResult({ isLoading, movie }: IMovieResult): ReactElement {
  const [showMore, setShowMore] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const favoritesList = useSelector(selectFavorites);

  // Functions
  useEffect(() => {
    if (!movie) setIsFavorited(false);

    const isFavorite = favoritesList.some((f) => f.imdbID === movie?.imdbID);
    setIsFavorited(isFavorite);
  }, [movie]);

  const toggleFavorite = (): void => {
    if (!movie) return;

    setIsFavorited(!isFavorited);
    // update store
    if (isFavorited) {
      dispatch(removeFavorite(movie?.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <section className={style.movie_info + ' padding-top--md'}>
      <div className={style.movie_info_container + ' container'}>
        {isLoading ? (
          <LoadingState />
        ) : (
          <article className={style.movie_info_article + ' align-items--start'}>
            <picture className={style.movie_info_picture}>
              <img
                className={
                  style.movie_info_picture__poster + ' figure-img rounded'
                }
                src={movie?.Poster ?? './assets/images/default-image.jpg'}
                alt="movie poster"
              />
            </picture>

            <div className={style.movie_info_about}>
              <h2 className={style.movie_info_about__title}>
                {movie?.Title}
                <small className="margin-left--2xs">{movie?.imdbID}</small>
              </h2>
              <p
                className={
                  style.movie_info_about__synopsis + ' margin-bottom--md'
                }>
                {movie?.Plot}
              </p>

              <ul
                className={
                  style.movie_info_about_details +
                  ' padding-left--0 margin-bottom--md'
                }>
                <li
                  className={
                    style.movie_info_about_details__item +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  <strong className="me-2">Actor:</strong>
                  <small>{movie?.Actors}</small>
                </li>
                <li
                  className={
                    style.movie_info_about_details__item +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  <strong className="me-2">Genre:</strong>
                  <small>{movie?.Genre}</small>
                </li>
                <li
                  className={
                    style.movie_info_about_details__item +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  {/* <li *ngIf="rating" className={style.movie_info_about_details__item + ' d-flex align-items--start padding-block--xs'}> */}
                  <strong className="me-2">Review:</strong>
                  {/* <app-rating [rating]="rating"></app-rating> */}
                </li>

                {showMore ? (
                  <>
                    <li
                      className={
                        style.movie_info_about_details__item +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Awards:</strong>
                      <small>{movie?.Awards}</small>
                    </li>
                    <li
                      className={
                        style.movie_info_about_details__item +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Duration:</strong>
                      <small>{movie?.Runtime}</small>
                    </li>
                    <li
                      className={
                        style.movie_info_about_details__item +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Director:</strong>
                      <small>{movie?.Director}</small>
                    </li>
                  </>
                ) : null}

                <a
                  className={style.movie_info_about_details__more}
                  onClick={() => setShowMore(!showMore)}>
                  Show more
                </a>
              </ul>

              <Button
                className={style.movie_info__button}
                design={isFavorited ? 'Negative' : 'Emphasized'}
                icon={isFavorited ? 'unfavorite' : 'favorite'}
                iconEnd
                onClick={toggleFavorite}
                style={{}}
                type="Button">
                {isFavorited ? 'Unfavorite' : 'Favorite'}
              </Button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

const LoadingState = () => (
  // <!-- Loading -->
  <article className={style.movie_info_article + ' align-items--start'}>
    <picture
      className={
        style.movie_info_picture + ' margin-bottom--md skeleton'
      }></picture>

    <div className={style.movie_info_about}>
      <h2
        className={style.movie_info_about__title + ' skeleton'}
        style={{ width: '200px', height: '30px', marginBottom: '8px' }}></h2>
      <p
        className={style.movie_info_about__synopsis + ' skeleton'}
        style={{
          height: '100px',
          width: '100%',
          maxWidth: '700px',
          marginBottom: '24px',
        }}></p>

      <ul
        className={
          style.movie_info_about_details + ' padding-left--0 margin-bottom--md'
        }>
        <li
          className={
            style.movie_info_about_details__item + ' margin-bottom--xs skeleton'
          }
          style={{ width: '180px', height: '25px' }}></li>
        <li
          className={
            style.movie_info_about_details__item + ' margin-bottom--xs skeleton'
          }
          style={{ width: '180px', height: '25px' }}></li>
      </ul>
    </div>
  </article>
);

export default MovieResult;
