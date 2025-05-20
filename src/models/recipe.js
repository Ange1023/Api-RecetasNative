import recipe from "../schemas/recipe.js";
import mongoose from "mongoose";
import Basemodel from "../utils/BaseModel.js";

class recipeModel extends Basemodel {
    constructor() {
        super(recipe);
    }

    // CRUD operations is in BaseModel
}

export default new recipeModel();