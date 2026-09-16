// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { deleteMultipleValues, setValue } from '../../utils/asyncstorage';
// import BackgroundGeolocation from 'react-native-background-geolocation';
// import {
//   fetchSettings as fetchSettingsService,
//   fetchNepaliMonths as fetchNepaliMonthsService,
//   fetchWeekOfMonth as fetchWeekOfMonthService,
//   fetchDecendents as fetchDecendentsService,
//   fetchOutletStatuses as fetchOutletStatusesService,
// } from '../../services/auth_services';


// interface AuthState {
//   token: string | null;
//   user: any;
//   permissions: any;
//   isDataSynced: boolean;
//   isPunchedIn: boolean;
//   lastSyncedTimeStamp: string | null;
//   settings: any;
//   nepaliMonths: any[];
//   decendents: any[];
//   outletStatuses: any[];
//   weekData: any;
// }

// const initialState: AuthState = {
//   token: null,
//   user: null,
//   permissions: null,
//   isDataSynced: false,
//   isPunchedIn: false,
//   lastSyncedTimeStamp: null,
//   settings: null,
//   nepaliMonths: [],
//   decendents: [],
//   outletStatuses: [],
//   weekData: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setToken: (state, { payload }: PayloadAction<string | null>) => {
//       state.token = payload;
//       if (payload) setValue('token', payload);
//     },

//     setUser: (state, { payload }: PayloadAction<string>) => {
//       state.user = JSON.parse(payload);
//       setValue('user', payload);
//     },

//     setWeekData: (state, { payload }: PayloadAction<string>) => {
//       state.weekData = JSON.parse(payload);
//       setValue('weekData', payload);
//     },

//     setPermissions: (state, { payload }: PayloadAction<string>) => {
//       state.permissions = JSON.parse(payload);
//       setValue('permissions', payload);
//     },

//     setPunchedIn: (state, { payload }: PayloadAction<boolean>) => {
//       state.isPunchedIn = payload;
//     },

//     setIsDataSynced: (state, { payload }: PayloadAction<string>) => {
//       state.isDataSynced = JSON.parse(payload);
//       setValue('isDataSynced', payload);
//     },

//     setLastSyncedTimeStamp: (state, { payload }: PayloadAction<string | null>) => {
//       state.lastSyncedTimeStamp = payload;
//       if (payload) setValue('lastSyncedTimeStamp', payload);
//     },

//     setSettings: (state, { payload }: PayloadAction<string>) => {
//       state.settings = JSON.parse(payload);
//     },

//     setNepaliMonths: (state, { payload }: PayloadAction<string>) => {
//       state.nepaliMonths = JSON.parse(payload);
//     },

//     setDecendents: (state, { payload }: PayloadAction<string>) => {
//       state.decendents = JSON.parse(payload);
//     },

//     setOutletStatuses: (state, { payload }: PayloadAction<string>) => {
//       state.outletStatuses = JSON.parse(payload);
//     },

//     logOut: (state) => {
//       state.token = null;
//       state.user = null;
//       state.permissions = null;
//       deleteMultipleValues(['auditUser', 'token', 'user', 'weekData', 'permissions', 'isDataSynced', 'lastSyncedTimeStamp', 'orderAndStockVisited']);
//       BackgroundGeolocation.stop();
//     },
//   },
// });

// export const {
//   setToken,
//   setUser,
//   setPermissions,
//   setPunchedIn,
//   setIsDataSynced,
//   logOut,
//   setLastSyncedTimeStamp,
//   setSettings,
//   setNepaliMonths,
//   setDecendents,
//   setOutletStatuses,
//   setWeekData,
// } = authSlice.actions;

// export default authSlice.reducer;
