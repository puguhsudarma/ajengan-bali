import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { makananInitState } from './initState';

const makananReducer = createReducer(makananInitState, {
  [actionType.FETCH_MAKANAN_DATA_FULLFILED]: (state, action) => ({
    ...state,
    listData: [...state.listData, ...action.payload],
    isFetching: false,
    isFetched: true,
  }),
  [actionType.FETCH_MAKANAN_DATA_REJECTED]: (state, action) => ({
    ...state,
    isFetching: false,
    isFetched: false,
    error: action.payload,
  }),
  [actionType.FETCH_MAKANAN_DATA_PENDING]: state => ({
    ...state,
    isFetching: true,
    error: null,
  }),
});

export default makananReducer;
