import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServerConfigState {
  ip1: string;
  ip2: string;
  ip3: string;
  ip4: string;
  port: string;
  division: string;
  terminal: string;
  orientation: "portrait" | "landscape";
  addOrderFromTop: boolean;
  printBillOnEPayment: boolean;
  enableOldApiSettings: boolean;
}

const initialState: ServerConfigState = {
  ip1: "",
  ip2: "",
  ip3: "",
  ip4: "",
  port: "",
  division: "",
  terminal: "",
  orientation: "portrait",
  addOrderFromTop: false,
  printBillOnEPayment: false,
  enableOldApiSettings: false,
};

const serverConfigSlice = createSlice({
  name: "serverConfig",
  initialState,
  reducers: {
    setServerConfig: (_, action: PayloadAction<ServerConfigState>) => {
      console.log("Saving server config:", action.payload);

      return action.payload;
    },
  },
});

export const { setServerConfig } = serverConfigSlice.actions;

export default serverConfigSlice.reducer;
