import React, { createContext, useReducer, Dispatch, useContext } from 'react';

// reducer
import { reducer, ReducerType, Actions } from './index';

// types
type Props = {
  children: JSX.Element;
};

type ProviderType = {
  state: ReducerType;
  dispatch: Dispatch<Actions>;
};

export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

export const IndexProvider = createContext<ProviderType | null>(null);

export function IndexStore({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <IndexProvider.Provider value={{ state, dispatch }}>{children}</IndexProvider.Provider>;
}

export function useMovieState() {
  // custom context
  const context = useContext(IndexProvider);
  if (!context) throw new Error('Cannot find useMovieState Provider');
  return context;
}
