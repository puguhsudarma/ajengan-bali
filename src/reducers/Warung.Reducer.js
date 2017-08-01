import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { warungInitState } from './initState';

const warungReducer = createReducer(warungInitState, {
  [actionType.FETCH_WARUNG_DATA_FULLFILED]: (state, action) => ({
    ...state,
    listData: [...action.payload],
    isFetching: false,
    isFetched: true,
  }),
  [actionType.FETCH_WARUNG_DATA_REJECTED]: (state, action) => ({
    ...state,
    isFetching: false,
    isFetched: false,
    error: action.payload,
  }),
  [actionType.FETCH_WARUNG_DATA_PENDING]: state => ({
    ...state,
    isFetching: true,
    error: null,
  }),
});

export default warungReducer;
