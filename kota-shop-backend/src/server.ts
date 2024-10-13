import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { foodRoutes } from "./routes/foodRoutes";
import { userRoutes } from "./routes/userRoutes";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());
app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});
app.route("/food", foodRoutes);
app.route("/user", userRoutes);

app.get("/", (c: { text: (arg0: string) => any }) => {
  return c.text("Hello Kota Shop!");
});

serve(app, (info: { port: any }) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
