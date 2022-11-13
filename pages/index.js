import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
// import axios from "axios";
import NextLink from "next/link";
import LayoutHome from "../components/LayoutHome";
import Product from "../models/Product";
import data from "../utils/data";
import db from "../utils/db";

export default function Home(props) {
  const { setThemeHandler, currentTheme /*products*/ } = props;

  const { products } = data;

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
    <LayoutHome
      setThemeHandler={setThemeHandler}
      currentTheme={currentTheme}
      categories={categories}
    >
      <div>
        <h1>Categories</h1>
        <Grid container rowSpacing={4} columnSpacing={8}>
          {oneProductForEachCategory.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.name}>
              <NextLink
                href={`/category/${product.category
                  .toLowerCase()
                  .replace(/\s/, "-")}`}
                passHref
              >
                <Card
                  sx={{
                    margin: "0 auto 0 auto",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: "primary.main",
                    "&:hover": {
                      boxShadow: "0 5px 20px -5px",
                      color: "success.main",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                      sx={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                      }}
                    ></CardMedia>
                  </CardActionArea>
                </Card>
              </NextLink>
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  textAlign: "center",
                }}
              >
                {product.category}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </LayoutHome>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
