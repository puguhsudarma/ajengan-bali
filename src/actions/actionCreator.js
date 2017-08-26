import createAction from '../libs/createAction';
import * as actionType from './actionType';

export const fetchWarung = {
  pending: createAction(actionType.FETCH_WARUNG_DATA_PENDING),
  success: createAction(actionType.FETCH_WARUNG_DATA_FULLFILED, 'payload'),
  failed: createAction(actionType.FETCH_WARUNG_DATA_REJECTED, 'payload'),
};

export const fetchMakanan = {
  pending: createAction(actionType.FETCH_MAKANAN_DATA_PENDING),
  success: createAction(actionType.FETCH_MAKANAN_DATA_FULLFILED, 'payload'),
  failed: createAction(actionType.FETCH_MAKANAN_DATA_REJECTED, 'payload'),
};

export const setLocation = createAction(actionType.FETCH_LOCATION_FULLFILED, 'payload');
export const setUser = createAction(actionType.FETCH_USER_FULLFILED, 'payload');
