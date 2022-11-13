import { Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <TextField
        placeholder="Search..."
        fullWidth
        variant="outlined"
        size="small"
        id="search"
        inputProps={{ type: "search" }}
        color="success"
        sx={{
          maxWidth: "500px",
          height: "40px",
          [`& fieldset`]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      ></TextField>
      <Button
        color="success"
        variant="outlined"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: "40px",
          minWidth: "40px",
          width: "40px",
        }}
      >
        <Search />
      </Button>
    </Box>
  );
}
