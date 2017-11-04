import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { warungInitState } from './initState';

const warungReducer = createReducer(warungInitState, {
  [actionType.FETCH_DATA_LIST_WARUNG]: (state, action) => ({
    ...state,
    list: [...action.payload],
  }),
  [actionType.SELECT_DATA_WARUNG]: (state, action) => ({
    ...state,
    selected: action.payload,
  }),
  [actionType.FETCH_DATA_LIST_REVIEW_WARUNG]: (state, action) => ({
    ...state,
    reviews: action.payload.reviews,
    thisUserReview: action.payload.thisUserReview,
  }),
  [actionType.UPDATE_THIS_USER_REVIEW_WARUNG]: (state, action) => ({
    ...state,
    thisUserReview: {
      ...state.thisUserReview,
      ...action.payload,
    },
  }),
  [actionType.FETCH_SEARCHED_LIST_WARUNG]: (state, action) => ({
    ...state,
    listSearched: action.payload,
  }),
  [actionType.ERROR_WARUNG]: (state, action) => ({
    ...state,
    error: [
      ...state.error,
      action.payload,
    ],
  }),
});

export default warungReducer;
