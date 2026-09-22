import { combineReducers } from '@reduxjs/toolkit';
import serverReducer from './slices/server.slice';
import orderReducer from './slices/order.slice';
import tableReducer from './slices/table.slice';

const combinedReducer = combineReducers({
  server: serverReducer,
  order: orderReducer,
  table: tableReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logOut') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof combinedReducer>;
