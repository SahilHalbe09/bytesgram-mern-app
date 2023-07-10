import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const result = await RecipesModel.find({});
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
	const recipe = new RecipesModel({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		caption: req.body.caption,
		imageUrl: req.body.imageUrl,
		cookingTime: req.body.cookingTime,
		userOwner: req.body.userOwner,
	});

	try {
		const result = await recipe.save();

		res.status(201).json({
			createdRecipe: {
				name: result.name,
				caption: result.caption,
				imageUrl: result.imageUrl,
				cookingTime: result.cookingTime,
				_id: result._id,
				userOwner: result.userOwner,
			},
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
	try {
		const result = await RecipesModel.findById(req.params.recipeId);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Save a Recipe
router.put("/", async (req, res) => {
	const recipe = await RecipesModel.findById(req.body.recipeID);
	const user = await UserModel.findById(req.body.userID);
	try {
		user.savedRecipes.push(recipe);
		await user.save();
		res.status(201).json({ savedRecipes: user.savedRecipes });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Unsave a Recipe
router.delete("/", async (req, res) => {
	const recipeID = req.body.recipeID;
	const userID = req.body.userID;
	try {
		const user = await UserModel.findById(userID);
		const recipeIndex = user.savedRecipes.findIndex((recipe) => recipe.toString() === recipeID);

		if (recipeIndex === -1) {
			return res.status(404).json({ error: "Recipe not found in saved recipes" });
		}

		user.savedRecipes.splice(recipeIndex, 1);
		await user.save();
		res.status(200).json({ savedRecipes: user.savedRecipes });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		res.status(201).json({ savedRecipes: user?.savedRecipes });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		const savedRecipes = await RecipesModel.find({
			_id: { $in: user.savedRecipes },
		});
		res.status(201).json({ savedRecipes });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

export { router as recipesRouter };
