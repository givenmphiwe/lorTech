export interface FoodItem {
    id?: string;   
    userId: string;
    name: string;
    stock: number;
    price: number;
    imageBase64?: string; 
  }
  
  const apiBaseUrl = "http://localhost:3000/food"; 
  
  export const addFood = async (newFood: FoodItem): Promise<{ message: string }> => {
    const response = await fetch(`${apiBaseUrl}/add/${newFood.userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newFood.name,
        stock: newFood.stock,
        price: newFood.price,
        imageBase64: newFood.imageBase64,
      }),
    });
    return response.json();
  };
  
  export const updateFood = async (
    updateFoodData: FoodItem
  ): Promise<{ message: string }> => {
    const response = await fetch(
      `${apiBaseUrl}/update/${updateFoodData.userId}/${updateFoodData.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updateFoodData.name,
          stock: updateFoodData.stock, 
          price: updateFoodData.price, 
        }),
      }
    );
    return response.json();
  };
  
  export const deleteFood = async (
    userId: string,
    foodId: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${apiBaseUrl}/delete/${userId}/${foodId}`, {
      method: "DELETE",
    });
    return response.json();
  };
  
  export const getFoodItems = async (userId: string): Promise<FoodItem[]> => {
    const response = await fetch(`${apiBaseUrl}/${userId}`);
    return response.json();
  };
  