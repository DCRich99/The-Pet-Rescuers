import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPets from "./pages/SearchPets";
import SavedPets from "./pages/SavedPets";
import DonatePets from "./pages/DonatePets";
import Navbar from "./components/Navbar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchPets} />
            <Route exact path="/donate" component={DonatePets} />
            <Route exact path="/saved" component={SavedPets} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
