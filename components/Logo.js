import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Box sx={{ marginLeft: "10px", marginRight: "10px" }}>
      <NextLink href="/" passHref>
        <Link underline="none">
          <Typography
            sx={{
              fontFamily: "Romanesco, cursive",
              fontSize: "3.5rem",
              color: "warning.main",
              whiteSpace: "nowrap",
              textAlign: "center",
              height: "80px",
            }}
            color="secondary"
          >
            Antique Shop
          </Typography>
        </Link>
      </NextLink>
    </Box>
  );
}
