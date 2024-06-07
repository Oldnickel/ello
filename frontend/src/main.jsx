import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import "@fontsource/mulish"; // Import the Mulish font

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
