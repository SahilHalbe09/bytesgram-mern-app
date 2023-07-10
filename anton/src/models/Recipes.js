import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
		required: true,
		maxlength: 100,
	},
	imageUrl: {
		type: String,
		required: true,
		required: true,
	},
	cookingTime: {
		type: Number,
		required: true,
	},
	userOwner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const RecipesModel = mongoose.model("Recipes", recipeSchema);
