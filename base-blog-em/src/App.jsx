import { Posts } from "./Posts";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={QueryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
