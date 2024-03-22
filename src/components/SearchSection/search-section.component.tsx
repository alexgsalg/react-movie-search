import { Button, Grid, Input } from '@ui5/webcomponents-react';
import { ReactElement, useState } from 'react';
import { MovieSuggestion } from '../../models/movies';
import style from './search-section.module.scss';

interface ISearchSection {
  isLoading: boolean;
}

function SearchSection({ isLoading }: ISearchSection): ReactElement {
  const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [movieTitle, setMovieTitle] = useState<string>('');

  // functions
  const onFocus = (): void => setInputFocused(true);
  const onBlur = (): void => setInputFocused(false);

  const onSearch = (): void => console.log('searching...');

  const onInputReset = (): void => setMovieTitle('');

  const navigateSuggestions = (ev: React.KeyboardEvent<HTMLElement>): void =>
    console.log('navigateSuggestions', ev);

  return (
    <section className={style.search + ''}>
      <div className={style.search_container + ' container'}>
        <div className={style.search_heading + ' margin-bottom--md'}>
          <h2 className={style.search__title + ' text-body'}>Title</h2>
          <p className={style.search__subtext + ' text-muted'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias
            autem, provident est nemo cum laboriosam ducimus iure ab.
          </p>
        </div>

        <form className={style.search_bar}>
          <Grid
            defaultIndent="XL3 L0 M0 S0"
            defaultSpan="XL3 L10 M6 S12"
            hSpacing="1rem"
            position="Center"
            vSpacing="1rem">
            <div data-layout-span="L6 M12 S12" className=" position--relative">
              <Input
                type="Text"
                placeholder="Search by movie title"
                className="width--100"
                value={movieTitle}
                onInput={(e) => {
                  setMovieTitle(e.target.value);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyUp={(ev) => navigateSuggestions(ev)}
              />

              {/* Suggestions */}
              {inputFocused && movieTitle.length > 1 ? (
                <ul className={style.search_suggestions + ' shadow'}>
                  {!suggestionLoading ? (
                    suggestions.length > 0 ? (
                      <>
                        <li
                          className={
                            style.search_suggestions__item +
                            ' d-flex align-items--center justify-content--between'
                          }>
                          <small className="d-inline-block text-muted"></small>
                          <span className="small-text text-muted .d-none .d-md-inline-block ms-auto"></span>
                        </li>
                        <li
                          className={
                            style.search_suggestions__item +
                            ' padding-block--sm'
                          }
                          style={{ pointerEvents: 'none' }}>
                          <small className="text-muted">
                            Hmm... Maybe if you keep typing.
                          </small>
                        </li>
                      </>
                    ) : (
                      <EmptySuggestions />
                    )
                  ) : (
                    <LoadingSuggestions />
                  )}
                </ul>
              ) : null}
            </div>

            <div data-layout-span="L3 M6 S6" className="">
              <Button
                className="width--100"
                design="Emphasized"
                icon="search"
                iconEnd
                onClick={onSearch}
                style={{}}
                type="Button"
                disabled={!movieTitle || isLoading}>
                Search
              </Button>
            </div>

            <div data-layout-span="L3 M6 S6" className="">
              <Button
                className="width--100"
                design="Default"
                onClick={onInputReset}
                style={{}}
                type="Button">
                Reset
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    </section>
  );
}

const LoadingSuggestions = () => {
  return (
    <div className="d-flex justify-content--center padding--md">
      <div className="loader"></div>
    </div>
  );
};

const EmptySuggestions = () => {
  return (
    <div className="d-flex justify-content--center padding--md">
      <span>No Movies with this title!</span>
    </div>
  );
};

export default SearchSection;
