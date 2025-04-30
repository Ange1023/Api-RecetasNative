import mongoose from "mongoose";

export default class BaseModel {
    constructor(model) {
        this.model = model; // Modelo de Mongoose
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            data,
            { new: true, runValidators: true } // el run validators es para que se ejecuten las validaciones de mongoose, por defecto, en el update no se ejecutan
        );
    }

    async delete(id) {
        return await this.model.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findAll() {
        return await this.model.find();
    }

    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    async paginate(filter = {}, options = { page: 1, limit: 10 }) { // paginacion clara y sencilla
        const { page, limit } = options;
        const skip = (page - 1) * limit;

        const data = await this.model.find(filter).skip(skip).limit(limit);
        const total = await this.model.countDocuments(filter);

        return {
            data,
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
}