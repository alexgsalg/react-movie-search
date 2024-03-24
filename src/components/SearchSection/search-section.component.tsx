import { BusyIndicator, Button, Grid, Input } from '@ui5/webcomponents-react';
import axios from 'axios';
import lodash from 'lodash';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { MovieSuggestion } from '../../models/movies';
import { BASE_URL } from '../../service/http.service';
import style from './search-section.module.scss';

interface ISearchSection {
  isLoading: boolean;
  fetchMovie: (movieSelected: MovieSuggestion) => Promise<void>;
}

function SearchSection({
  isLoading,
  fetchMovie,
}: ISearchSection): ReactElement {
  const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<MovieSuggestion | null>(null);
  const [linkIndex, setLinkIndex] = useState<number>(0);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [movieTitle, setMovieTitle] = useState<string>('');

  const inputRef = useRef<any>(null);
  const suggestionsRef = useRef<any>(null);

  // functions
  const onFocus = (): void => setInputFocused(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleSuggetionFocus);
    return () => {
      document.removeEventListener('mousedown', handleSuggetionFocus);
    };
  });

  const handleSuggetionFocus = (e: any) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target) &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target)
    ) {
      setInputFocused(false);
    }
  };

  const onInputReset = (): void => setMovieTitle('');

  const handleFetchSuggestions = async (term: string) => {
    await axios
      .get(`${BASE_URL}s=${term}`)
      .then((response) => {
        setSuggestions(response.data.Search);
        setSuggestionLoading(false);
      })
      .catch(() => {
        setSuggestionLoading(false);
      });
  };

  const handler = useCallback(lodash.debounce(handleFetchSuggestions, 300), []);

  const handleOnInputChange = (term: string) => {
    setSuggestionLoading(true);
    setMovieTitle(term);
    handler(term);
  };

  const navigateSuggestions = (ev: React.KeyboardEvent<HTMLElement>): void => {
    switch (ev.key) {
      case 'ArrowUp':
        linkIndex === 0 ? setLinkIndex(0) : setLinkIndex(linkIndex - 1);
        break;

      case 'ArrowDown':
        linkIndex === suggestions?.length
          ? suggestions?.length
          : setLinkIndex(linkIndex + 1);
        break;

      case 'Enter':
        selectSuggestionOnEnter();
        break;

      case 'Escape':
        // TODO: test if the input is blurred
        setInputFocused(false);
        break;
    }
  };

  const selectSuggestionOnEnter = () => {
    setMovieTitle(suggestions[linkIndex].Title);
    setSelectedSuggestion(suggestions[linkIndex]);
    setInputFocused(false);
  };

  const onSuggestionsSelect = (suggestion: MovieSuggestion) => {
    setMovieTitle(suggestion.Title);
    setSelectedSuggestion(suggestion);
    setInputFocused(false);
  };

  const onSearch = (suggestion: MovieSuggestion | null) => {
    if (!suggestion) return;

    setMovieTitle('');
    fetchMovie(suggestion);
  };

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
                ref={inputRef}
                type="Text"
                placeholder="Search by movie title"
                className="width--100"
                value={movieTitle}
                onInput={(e) => {
                  handleOnInputChange(e.target.value);
                }}
                onFocus={onFocus}
                // onBlur={onBlur}
                onKeyUp={(ev) => navigateSuggestions(ev)}
              />

              {/* Suggestions */}
              {inputFocused && movieTitle.length > 1 ? (
                <ul
                  className={style.search_suggestions + ' shadow'}
                  ref={suggestionsRef}>
                  {!suggestionLoading ? (
                    suggestions && suggestions.length > 0 ? (
                      suggestions.map((item, idx) => (
                        <li
                          key={idx}
                          className={
                            style.search_suggestions__item +
                            (idx === linkIndex ? ` ${style.focused}` : '') +
                            ' d-flex align-items--center justify-content--between'
                          }
                          onClick={() => onSuggestionsSelect(item)}>
                          <small className="d-inline-block text-muted">
                            {item.Title}
                          </small>
                          <span className="font-size--2xs text-muted margin-left--auto">
                            {item.imdbID}
                          </span>
                        </li>
                      ))
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
                onClick={() => onSearch(selectedSuggestion)}
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
      <BusyIndicator active delay={0} size="Small" />
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
