import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";

export default function DesktopCategories({ props }) {
  const { products } = props;

  if (!products) {
    return <div></div>;
  }

  const oneProductForEachCategory = products.reduce(
    (previousValue, currentValue) => {
      if (!Array.isArray(previousValue)) {
        previousValue = [].concat(previousValue);
      }
      if (
        previousValue.find((value) => value.category === currentValue.category)
      )
        return previousValue;
      return previousValue.concat(currentValue);
    }
  );

  const categories = [
    ...oneProductForEachCategory.map((product) => product.category),
  ];

  return (
    <Box
      sx={{
        marginBottom: "5px",
        marginTop: "10px",
        display: "flex",
      }}
    >
      {categories.map((category) => (
        <NextLink
          href={`/category/${category.toLowerCase().replace(/\s/, "-")}`}
          passHref
          key={category}
        >
          <Link
            color="secondary"
            underline="none"
            sx={{
              marginRight: "15px",
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderColor: "warning.main",
              },
            }}
          >
            <Typography>{category.toUpperCase()}</Typography>
          </Link>
        </NextLink>
      ))}
    </Box>
  );
}
