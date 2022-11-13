import { History, Person } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { classes } from "../utils/styles";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", orders: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderHistory(props) {
  const router = useRouter();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const userInfoStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (!userInfoStorage) {
      router.push("/login");
    }

    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfoStorage.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title="Order History" props={props}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={{ mt: "10px" }}>
            <NextLink href="/profile" passHref>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>User Profile</ListItemText>
              </ListItemButton>
            </NextLink>
            <Divider />
            <NextLink href="/order-history" passHref>
              <ListItemButton selected>
                <ListItemIcon sx={{ color: "warning.main" }}>
                  <History />
                </ListItemIcon>
                <ListItemText sx={{ color: "warning.main" }}>
                  Order History
                </ListItemText>
              </ListItemButton>
            </NextLink>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card sx={{ mt: "10px" }}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography style={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : "not paid"}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : "not delivered"}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button color="success" variant="text">
                                  Details
                                </Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
