import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/system";
import BookMarkAdd from "@mui/icons-material/BookmarkAdd";
import BookMarkAdded from "@mui/icons-material/BookmarkAdded";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";

function MainLayout({ books }) {
  const [tabValue, setTabValue] = useState(0);
  const [paginationState, setPaginationState] = useState({
    0: { currentPage: 1 },
    1: { currentPage: 1 },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const itemsPerPage = 6;

  const assignUniqueIdentifiers = (books) => {
    return books.map((book) => ({
      ...book,
      id: uuidv4(),
    }));
  };

  useEffect(() => {
    const newBooks = assignUniqueIdentifiers(books);
    setAllBooks(newBooks);
  }, [books]);

  const updateBookLists = (book) => {
    console.log("book: ", book);

    const filteredBooks = allBooks.filter(
      (currentBook) => currentBook.id !== book.id
    );

    const updatedReadingList = [...readingList, book];

    setAllBooks(filteredBooks);
    setReadingList(updatedReadingList);
  };

  const moveBookToBooks = (book) => {
    const updatedReadingList = readingList.filter(
      (currentBook) => currentBook.id !== book.id
    );

    const updatedBooks = [...allBooks, book];

    setAllBooks(updatedBooks);
    setReadingList(updatedReadingList);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery("");
    setPaginationState((prevState) => ({
      ...prevState,
      [newValue]: { currentPage: 1 },
    }));
  };

  const handlePageChange = (event, page) => {
    setPaginationState((prevState) => ({
      ...prevState,
      [tabValue]: {
        ...prevState[tabValue],
        currentPage: page,
      },
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const currentPage = paginationState[tabValue].currentPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container
        sx={{ flex: 1, display: "flex", flexDirection: "column", mt: 2 }}
      >
        <Tabs value={tabValue} sx={{ mb: 6 }} onChange={handleChange} centered>
          <Tab label="Search" />
          <Tab label="Reading List" />
        </Tabs>
        {tabValue === 0 && (
          <>
            <TextField
              variant="outlined"
              placeholder="Search for books..."
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 4 }}
            />
            <Grid container spacing={4}>
              {filteredBooks.length > 0 ? (
                filteredBooks.slice(startIndex, endIndex).map((book, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        position: "relative",
                        transition: "box-shadow 0.3s",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.coverPhotoURL}
                        alt={book.title}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                            }}
                            color="primary.dark"
                            variant="body1"
                          >
                            {book.title}
                          </Typography>
                          <CardActions sx={{ mt: "auto" }}>
                            <IconButton
                              color="primary"
                              aria-label="add to shopping cart"
                              onClick={() => updateBookLists(book)}
                              sx={{
                                "&:hover": {
                                  color: "primary.light",
                                },
                              }}
                            >
                              <BookMarkAdd />
                            </IconButton>
                          </CardActions>
                        </Box>
                        <Typography variant="body2">{book.author}</Typography>
                      </CardContent>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography variant="caption">
                          {book.readingLevel}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                    padding: "2rem",
                    width: "100%",
                    height: "50vh",
                    top: 0,
                    left: 0,
                  }}
                >
                  <Typography variant="body1" component="div">
                    No books found.
                  </Typography>
                </Box>
              )}
            </Grid>
          </>
        )}
        {tabValue === 1 && (
          <Grid container spacing={4}>
            {readingList.length > 0 ? (
              readingList.slice(startIndex, endIndex).map((book, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      mb: 2,
                      transition: "box-shadow 0.3s",
                      "&:hover": {
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 140,
                        mr: 2,
                        transition: "box-shadow 0.3s",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        },
                      }}
                      image={book.coverPhotoURL}
                      alt={book.title}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "2px 4px",
                        borderRadius: "10px",
                        margin: "4px",
                      }}
                    >
                      <Typography variant="caption">
                        {book.readingLevel}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Typography
                          sx={{ color: "primary.dark", fontWeight: "bold" }}
                          variant="h6"
                        >
                          {book.title}
                        </Typography>
                        <CardActions sx={{ mt: "auto" }}>
                          <IconButton
                            color="primary"
                            onClick={() => moveBookToBooks(book)}
                            aria-label="add to shopping cart"
                            sx={{
                              "&:hover": {
                                color: "secondary.contrastText",
                              },
                            }}
                          >
                            <BookMarkAdded />
                          </IconButton>
                        </CardActions>
                      </Box>
                      <Typography variant="body2">{book.author}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  padding: "2rem",
                  width: "100%",
                  height: "50vh",
                  top: 0,
                  left: 0,
                }}
              >
                <Typography variant="body1" component="div">
                  No books in your reading list yet.
                </Typography>
              </Box>
            )}
          </Grid>
        )}

        {tabValue === 0 ? (
          <Box
            sx={{ mt: 4, mb: 10, display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={Math.ceil(filteredBooks.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        ) : (
          <Box
            sx={{ mt: 4, mb: 10, display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={Math.ceil(readingList.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default MainLayout;
