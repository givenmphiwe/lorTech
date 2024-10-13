import { Context } from "hono";
import { db, food } from "../db";
import { eq, and } from "drizzle-orm";
import { getSignedUrl, uploadImageToS3 } from "../utils/s3Upload"; // Import the utils
import message from "aws-sdk/lib/maintenance_mode_message.js";
message.suppress = true;


// Get all food items for a specific user
export const getFoodItems = async (c: Context) => {
  const userId = c.req.param("userId");
  const foodItems = await db
    .select()
    .from(food)
    .where(eq(food.userId, (userId)));

  const foodItemsWithSignedUrl = foodItems.map((item) => {
    const imageUrl = getSignedUrl(item.image);
    return {
      ...item,
      imageUrl,
      image: undefined,
    };
  });

  return c.json(foodItemsWithSignedUrl);
};

// Add a new food item
export const addFood = async (c: Context) => {
  const userId = c.req.param("userId");
  const { name, stock, price, imageBase64 } = await c.req.json();

  const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid image base64 string");
  }

  const mimeType = matches[1];
  const imageBuffer = Buffer.from(matches[2], "base64");
  const imageName = `${Date.now()}.${mimeType.split("/")[1]}`;

  await uploadImageToS3(imageBuffer, imageName, mimeType);

  await db.insert(food).values({
    name,
    stock,
    price,
    image: imageName,
    userId: userId,
  });

  return c.json({
    message: "Food item and image added successfully",
    imageName,
  });
};

// Update a food item for a specific user
export const updateFood = async (c: Context) => {
  const userId = c.req.param("userId");
  const id = c.req.param("id");
  const { name, stock, price } = await c.req.json();

  const result = await db
    .update(food)
    .set({ name, stock, price })
    .where(and(eq(food.id, Number(id)), eq(food.userId, userId)));

  return result.rowCount && result.rowCount > 0
    ? c.json({ message: "Food item updated successfully" })
    : c.json(
        { message: "Food item not found" },
        404
  );
};

// Delete a specific food item for a specific user
export const deleteFood = async (c: Context) => {
  const userId = c.req.param("userId");
  const id = c.req.param("id");

  const result = await db
    .delete(food)
    .where(and(eq(food.id, Number(id)), eq(food.userId, userId)));

  return result.rowCount && result.rowCount > 0
    ? c.json({ message: "Food item deleted successfully" })
    : c.json(
        { message: "Food item not found" },
        404
      );
};
