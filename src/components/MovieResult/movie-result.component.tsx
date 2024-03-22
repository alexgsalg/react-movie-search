import { Button } from '@ui5/webcomponents-react';
import { ReactElement, useState } from 'react';
import style from './movie-result.module.scss';

interface IMovieResult {
  isLoading: boolean;
  movie: unknown;
}

function MovieResult({ isLoading, movie }: IMovieResult): ReactElement {
  const [showMore, setShowMore] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Functions
  const toggleFavorite = (): void => {
    setIsFavorited(!isFavorited);
    // update store
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
                src={'./assets/images/default-image.jpg'}
                alt="movie poster"
              />
            </picture>

            <div className={style.movie_info_about + ' col-12 col-md-8 pe-3'}>
              <h2 className={style.movie_info_about__title + ''}>
                title
                <small className="ms-2">id</small>
              </h2>
              <p
                className={
                  style.movie_info_about__synopsis + ' margin-bottom--md'
                }>
                plot
              </p>

              <ul
                className={
                  style.movie_info_about_details +
                  ' padding-left--0 margin-bottom--md'
                }>
                <li
                  className={
                    style.movie_info_about_details__items +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  <strong className="me-2">Actor:</strong>
                  {/* <small>{{ movie?.Actors }}</small> */}
                </li>
                <li
                  className={
                    style.movie_info_about_details__items +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  <strong className="me-2">Genre:</strong>
                  {/* <small>{{ movie?.Genre }}</small> */}
                </li>
                <li
                  className={
                    style.movie_info_about_details__items +
                    ' d-flex align-items--start padding-block--xs'
                  }>
                  {/* <li *ngIf="rating" className={style.movie_info_about_details__items + ' d-flex align-items--start padding-block--xs'}> */}
                  <strong className="me-2">Review:</strong>
                  {/* <app-rating [rating]="rating"></app-rating> */}
                </li>

                {showMore ? (
                  <>
                    <li
                      className={
                        style.movie_info_about_details__items +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Awards:</strong>
                      {/* <small>{{ movie?.Awards }}</small> */}
                    </li>
                    <li
                      className={
                        style.movie_info_about_details__items +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Duration:</strong>
                      {/* <small>{{ movie?.Runtime }}</small> */}
                    </li>
                    <li
                      className={
                        style.movie_info_about_details__items +
                        ' d-flex align-items--start padding-block--xs'
                      }>
                      <strong className="me-2">Director:</strong>
                      {/* <small>{{ movie?.Director }}</small> */}
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
                className={style.movie_info__button + ' padding-inline--sm'}
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
  <article className="row flex-md-row-reverse align-items-stretch">
    <picture className="movie-info_picture col-12 col-md-4 figure mb-4 m-md-0 skeleton"></picture>

    <div className="movie-info_about col-12 col-md-8 pe-3">
      <h2
        className="movie-info_about__title skeleton"
        style={{ width: '200px', height: '30px' }}></h2>
      <p
        className="movie-info_about__synopsis mb-4 skeleton"
        style={{ height: '100px' }}></p>

      <ul className="movie-info_about_details ps-0 mb-4">
        <li
          className="movie-info_about_details__items d-flex skeleton mb-2"
          style={{ width: '180px', height: '25px' }}></li>
        <li
          className="movie-info_about_details__items d-flex skeleton"
          style={{ width: '180px', height: '25px' }}></li>
      </ul>
    </div>
  </article>
);

export default MovieResult;
