import { Button, Grid } from '@ui5/webcomponents-react';
import { ReactElement, useState } from 'react';
import { MovieSuggestion } from '../../models/movies';
import style from './search-section.module.scss';

interface ISearchSection {
  isLoading: boolean;
}

function SearchSection({ isLoading }: ISearchSection): ReactElement {
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);

  return (
    <section className={style.search + ' py-3 py-md-5'}>
      <div className={style.search_container + ' container'}>
        <div className={style.search_heading + ' mb-4'}>
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
            hSpacing="2rem"
            position="Center"
            vSpacing="2rem">
            <div
              data-layout-span="L6 M12 S12"
              className="mb-3 mb-lg-0 padding--xs position-relative">
              <input type="text" name="" id="" />
              {/* <app-field-input
          placeholder="Start typing the movie title" type="text"
          formControlName="title"
          name="title"
          (onFocus)="this.inputFocused = true"
          (keyup)="navigateUsingKey($event)"
          ></app-field-input> */}

              {/* Suggestions */}
              {/* <ng-container *ngIf="inputFocused && form.get('title')?.value?.length > 1"> */}
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
                          style.search_suggestions__item + ' padding-block--sm'
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
            </div>

            <div data-layout-span="L3 M6 S6" className="padding-inline--sm">
              <Button
                design="Emphasized"
                icon="search"
                iconEnd
                onClick={function _a() {}}
                style={{}}
                type="Button">
                Search
              </Button>
              {/* <app-button
          variant="primary"
          icon="search-outline"
          [fullwidth]="true"
          [isDisabled]="!form.value.title"
          [loading]="isLoading"
          (click)="onSearch()"
        >
          Search
        </app-button> */}
            </div>

            <div data-layout-span="L3 M6 S6" className="padding-inline--sm">
              {/* <app-button variant="secondary" >Reset</app-button> */}
            </div>
          </Grid>
        </form>
      </div>
    </section>
  );
}

const LoadingSuggestions = () => {
  return (
    <div className="d-flex justify-content-center p-4">
      <div className="loader"></div>
    </div>
  );
};

const EmptySuggestions = () => {
  return (
    <div className="d-flex justify-content-center p-4">
      <span>No Movies with this title!</span>
    </div>
  );
};

export default SearchSection;
