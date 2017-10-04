import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { makananInitState } from './initState';

const makananReducer = createReducer(makananInitState, {
  [actionType.FETCH_DATA_LIST_MAKANAN]: (state, action) => ({
    ...state,
    list: [...action.payload],
  }),
  [actionType.FETCH_DATA_LIST_MAKANAN_BY_SELECTED_WARUNG]: (state, action) => ({
    ...state,
    listMakananBySelectedWarung: [...action.payload],
  }),
  [actionType.SELECT_DATA_MAKANAN]: (state, action) => ({
    ...state,
    selected: action.payload,
  }),
  [actionType.FETCH_DATA_LIST_REVIEW_MAKANAN]: (state, action) => ({
    ...state,
    reviews: [...action.payload.reviews],
    thisUserReview: action.payload.thisUserReview,
  }),
  [actionType.FETCH_SEARCHED_LIST_MAKANAN]: (state, action) => ({
    ...state,
    listSearched: action.payload,
  }),
  [actionType.ERROR_MAKANAN]: (state, action) => ({
    ...state,
    error: [
      ...state.error,
      action.payload,
    ],
  }),
});

export default makananReducer;
