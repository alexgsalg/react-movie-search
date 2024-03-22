export const BASE_URL = 'https://www.omdbapi.com/?apikey=75e8a716&';

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = { type: T };

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
