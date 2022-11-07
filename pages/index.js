import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
// import axios from "axios";
import NextLink from "next/link";
import Layout from "../components/Layout";
import Product from "../models/Product";
import data from "../utils/data";
import db from "../utils/db";
import { classes } from "../utils/styles";

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
    <Layout
      setThemeHandler={setThemeHandler}
      currentTheme={currentTheme}
      categories={categories}
    >
      <div>
        <h1>Categories</h1>
        <Grid container spacing={5}>
          {oneProductForEachCategory.map((product) => (
            <Grid item md={3} key={product.name}>
              <Card>
                <NextLink
                  href={`/category/${product.category
                    .toLowerCase()
                    .replace(/\s/, "-")}`}
                  passHref
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography
                        component="h2"
                        variant="h2"
                        sx={classes.categoryCard}
                      >
                        {product.category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
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
