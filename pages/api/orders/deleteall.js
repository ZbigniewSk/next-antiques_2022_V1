import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Order.deleteMany();
  await db.disconnect();
  res.send({ message: "orders deleted successfully" });
});

export default handler;
