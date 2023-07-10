import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const Saved = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID();

	useEffect(() => {
		const fetchSavedRecipes = async () => {
			try {
				const response = await axios.get(`https://bytesgram-mern-app.onrender.com/recipes/savedRecipes/${userID}`);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.error(err);
			}
		};

		fetchSavedRecipes();
	}, []);
	return (
		<div className="container flex flex-col justify-center items-center border">
			<ul className="flex flex-col items-center justify-center gap-10 mt-20 mb-5">
				{savedRecipes.map((recipe) => (
					<li key={recipe._id} className="border px-9 py-4 max-w-md lg:w-96 sm:w-72">
						<h2 className="text-lg font-bold">{recipe.name}</h2>
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

export default Saved;
