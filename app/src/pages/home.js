import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);

	const userID = useGetUserID();

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get("http://localhost:3001/recipes");
				setRecipes(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		const fetchSavedRecipes = async () => {
			if (userID) {
				try {
					const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
					setSavedRecipes(response.data.savedRecipes);
				} catch (err) {
					console.error(err);
				}
			}
		};

		fetchRecipes();
		fetchSavedRecipes();
	}, []);

	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put("http://localhost:3001/recipes", {
				recipeID,
				userID,
			});

			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.error(err);
		}
	};

	const unsaveRecipe = async (recipeID) => {
		try {
			const response = await axios.delete("http://localhost:3001/recipes", {
				data: {
					recipeID,
					userID,
				},
			});

			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.error(err);
		}
	};

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	return (
		<div className="container flex flex-col justify-center items-center border">
			<ul className="flex flex-col items-center justify-center gap-10 mt-20 mb-5">
				{recipes.map((recipe) => (
					<li key={recipe._id} className="border px-9 py-4 max-w-md lg:w-96 sm:w-72">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">{recipe.name}</h2>

							{userID &&
								(isRecipeSaved(recipe._id) ? (
									<button onClick={() => unsaveRecipe(recipe._id)}>
										<BsFillBookmarkCheckFill size={18} />
									</button>
								) : (
									<button onClick={() => saveRecipe(recipe._id)}>
										<BsBookmark size={18} />
									</button>
								))}
						</div>
						<img src={recipe.imageUrl} alt={recipe.name} draggable="false" className="my-5 min-w-full object-fill" />

						<div className="flex flex-col items-start">
							<p className="text-gray-900 text-md font-extralight">{recipe.caption}</p>
							<p className="text-sm font-light text-gray-600">{recipe.cookingTime} mins to cook</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
