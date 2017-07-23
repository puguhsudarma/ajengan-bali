import createAction from '../libs/createAction';
import * as actionType from './actionType';

export const fetchWarung = createAction(actionType.FETCH_WARUNG_DATA, 'payload');
export const fetchMakanan = createAction(actionType.FETCH_MAKANAN_DATA, 'payload');
