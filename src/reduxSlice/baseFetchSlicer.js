import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import api from '../api/api';
import {
  SLICER_INIT,
  AJAX_STATUES_LOADING,
  AJAX_STATUES_SUCCESS,
  AJAX_STATUES_FAILED
} from './fetchStatus';

const shallowEqual = (o1, o2) => {
  for (const k in o1) {
    if (Object.hasOwnProperty.call(o1, k)) {
      if(!o2[k] || o1[k]!==o2[k]) return false
    }
  }
  return true
}

export default function baseFetchSlicer(feature) {
  const path = `${feature}/fetch`;
  const setLastArgsAction = createAction(feature+'/setLastArgs')

  return ({
    createFetchApi: (req) => createAsyncThunk(path, async (args, thunkAPI) => {
      const {getState, dispatch, rejectWithValue} = thunkAPI
      const {lastArgs} = getState()

      if(lastArgs && shallowEqual(lastArgs, args))
        rejectWithValue(-1) // redundant request

      dispatch(setLastArgsAction(args))

      const json = await api(req(args));
      return json;
    }),

    createFetchSlice: (initStates, customReducers={}, onSuccess=()=>{}) => createSlice({
      name: feature,
      initialState: {
        ...initStates,
        status: SLICER_INIT,
        lastArgs: null,
        error: null,
      },
      reducers: {
        reset: state => {
          state.status = SLICER_INIT;
        },
        setLastArgs: (state, action) => {
          state.lastArgs = action.payload;
        },
        ...customReducers,
      },
      extraReducers: {
        [`${path}/pending`]: (state, action) => {
          state.status = AJAX_STATUES_LOADING;
        },
        [`${path}/fulfilled`]: (state, action) => {
          state.status = AJAX_STATUES_SUCCESS;
          onSuccess(state, action.payload);
        },
        [`${path}/rejected`]: (state, action) => {
          state.status = AJAX_STATUES_FAILED;
          state.error = action.error.message;
        }
      }
    }),

  })
};



