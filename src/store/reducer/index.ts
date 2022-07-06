type Movies = Array<{Title: string}>

type ReducerType = {
  loading?: boolean,
  movies: Movies | never[],
  errorMessage?: string | null
}

type Actions = 
| 
{type: 'SEARCH_MOVIES_REQUEST'} 
| 
{type: 'SEARCH_MOVIES_SUCCESS', payload: Movies} 
|
{type: 'SEARCH_MOVIES_FAILURE', error: string} 

export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

export const reducer = (state: ReducerType, action: Actions): ReducerType => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
