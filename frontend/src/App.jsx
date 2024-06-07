import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { GET_BOOKS } from "./services/queries";
import MainLayout from "./layouts/MainLayout";

function App() {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      //console.log("data: ", data);
      setBooks(data.books);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return <MainLayout books={books} />;
}

export default App;
