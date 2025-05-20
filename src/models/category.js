import category from "../schemas/category.js";
import BaseModel from "../utils/BaseModel.js";

class categoryModel extends BaseModel {

    constructor(){
        super(category)
    }

    // CRUD operations is in BaseModel

}

export default new categoryModel();