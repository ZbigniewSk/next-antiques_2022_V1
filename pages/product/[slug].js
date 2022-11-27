import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
// import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
// import data from "../../utils/data";
import { Store } from "../../utils/Store";

export default function ProductScreen(props) {
  const { product } = props;
  // const classes = useStyles();
  const router = useRouter();
  // const { products } = data;
  // const { slug } = router.query;
  // const product = products.find((a) => a.slug === slug);
  const { state, dispatch } = useContext(Store);
  // const router = useRouter();
  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
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
      title={product.name}
      description={product.description}
      props={props}
    >
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <NextLink
          href={`/category/${product.category
            .toLowerCase()
            .replace(/\s/, "-")}`}
          passHref
        >
          <Link color="secondary">
            <Typography>{`back to ${product.category}`}</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            objectFit="contain"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Rating: &nbsp;</Typography>
              <Rating value={product.rating} readOnly></Rating>
            </ListItem>
            <ListItem>
              <Typography>Reviews: {product.numReviews}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="text"
                  color="success"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
      products: products.map(db.convertDocToObj),
    },
  };
}

// export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });
