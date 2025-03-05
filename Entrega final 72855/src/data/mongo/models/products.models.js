import { de } from "@faker-js/faker";
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    category: { type: String, default: "none", index: true },
    photo: {
      type: String,
      default: "https://static.thenounproject.com/png/1247947-200.png",
    },
    stock: { type: Number, default: 10, min: 0 },
    price: { type: Number, default: 10, min: 0 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.methods.populateUser = function () {
  return this.populate("user_id", "-_id name email avatar");
};

const Product = model(collection, schema);
export default Product;
