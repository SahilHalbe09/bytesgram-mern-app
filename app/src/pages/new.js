import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Label, Textarea, TextInput } from "flowbite-react";

const New = () => {
	const userID = useGetUserID();
	const [cookies, _] = useCookies(["access_token"]);
	const [recipe, setRecipe] = useState({
		name: "",
		caption: "",
		imageUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(
				"http://localhost:3001/recipes",
				{ ...recipe },
				{
					headers: { authorization: cookies.access_token },
				}
			);

			alert("Post Created");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container flex flex-col justify-center items-center max-h-screen h-screen">
			<div className="border max-w-md lg:w-96 p-4 w-72 flex flex-col items-center">
				<h2 className="text-2xl font-light mb-5">Create Recipe</h2>

				<form className="flex max-w-md flex-col gap-4 lg:w-72 w-60" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name">Name</Label>
						</div>
						<TextInput type="text" id="name" name="name" value={recipe.name} onChange={handleChange} required />
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="caption">Caption</Label>
						</div>
						<Textarea id="caption" name="caption" value={recipe.caption} onChange={handleChange} required />
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="imageUrl">Image URL</Label>
						</div>
						<TextInput type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} required />
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
						</div>
						<TextInput type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} required />
					</div>

					<Button type="submit">Create Post</Button>
				</form>
			</div>
		</div>
	);
};

export default New;
