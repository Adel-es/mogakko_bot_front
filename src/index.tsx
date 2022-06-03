import React, { createContext, useReducer, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export interface State {
  url: string;
}
const initState: State = {
  url: "https://virtserver.swaggerhub.com/zetwhite/mkko_bot/1.0.0",
};
const Context = createContext<State>(initState);
const reducer = (state: State, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

export { Context, Provider };
