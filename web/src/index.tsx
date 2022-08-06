import ReactDOM from "react-dom/client";
import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import Rotas from "./Rotas";


const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <ApolloProvider client={client}>
      <Rotas />
    </ApolloProvider>
);
