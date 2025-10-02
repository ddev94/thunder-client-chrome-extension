import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ResponseState = {
  result?:
    | {
        statusCode: number | null;
        statusText: string;
        time: number | null;
        size: number | null;
        body: string;
        headers: { key: string; value: string }[];
        cookies: { key: string; value: string }[];
        error: string | null;
        status: "idle" | "loading" | "succeeded" | "failed";
      }
    | undefined;
};

const initialState: ResponseState = {
  result: undefined,
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponseResult(state, action: PayloadAction<ResponseState["result"]>) {
      state.result = action.payload;
    },
  },
});

export const { setResponseResult } = responseSlice.actions;
