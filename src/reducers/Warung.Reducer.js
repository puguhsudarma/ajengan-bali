import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { warungInitState } from './initState';

const WarungReducer = createReducer(warungInitState, {
  [actionType.FETCH_WARUNG_DATA]: (state, action) => ({
    ...state,
    warung: [...state.warung, ...action.payload],
  }),

  [actionType.FETCH_MAKANAN_DATA]: (state, action) => ({
    ...state,
    makanan: [...state.warung, ...action.payload],
  }),
});

export default WarungReducer;
