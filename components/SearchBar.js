import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function SearchBar({ props }) {
  const { products, currentTheme } = props;

  const router = useRouter();

  const data =
    products && products.map((product, index) => ({ ...product, id: index }));

  const handleOnSelect = (product) => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {data && (
        <Box
          sx={{
            maxWidth: 500,
            width: "100%",
          }}
        >
          <ReactSearchAutocomplete
            items={data}
            fuseOptions={{ keys: ["name"] }}
            resultStringKeyName="name"
            onSelect={handleOnSelect}
            styling={{
              zIndex: 2,
              borderRadius: "6px",
              boxShadow:
                currentTheme === "dark"
                  ? "#0AFFFF 0px 0px 20px -5px"
                  : "#000 0px 2px 6px -2px",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
