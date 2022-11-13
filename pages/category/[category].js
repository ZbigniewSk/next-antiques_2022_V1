import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
// import data from "../../utils/data";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function Category(props) {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  // const { products } = data;

  const { category } = router.query;
  const productsOfOneCategory = products.filter(
    (a) => a.category.toLowerCase().replace(/\s/, "-") === category
  );

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout
      title={
        productsOfOneCategory && productsOfOneCategory.find(() => true).category
      }
      props={props}
    >
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <NextLink href="/" passHref>
          <Link color="secondary">
            <Typography>back to categories</Typography>
          </Link>
        </NextLink>
      </div>
      <div>
        <h1>
          {productsOfOneCategory &&
            productsOfOneCategory.find(() => true).category}
        </h1>
        <Grid container spacing={3} justifyContent="center">
          {productsOfOneCategory.map((product) => (
            <Grid item sm={6} md={4} key={product.name}>
              <Card
                sx={{
                  "&:hover": {
                    boxShadow: "0 5px 20px -5px",
                    boxShadowColor: "success.main",
                  },
                }}
              >
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                      sx={{
                        maxWidth: "400px",
                        aspectRatio: "1/1",
                      }}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Typography>${product.price}</Typography>
                  <Button
                    // size="small"
                    color="success"
                    variant="text"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
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
