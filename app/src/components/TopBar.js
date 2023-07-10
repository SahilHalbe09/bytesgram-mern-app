import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { Button, Navbar } from "flowbite-react";
import { AiOutlineHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineCreate } from "react-icons/md";

const TopBar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const location = useLocation();
	const currentPage = location.pathname;

	const userID = useGetUserID();

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/auth");
	};

	return (
		<>
			<Navbar rounded className="bg-white border-gray-200 dark:bg-gray-900 max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 lg:px-16 fixed w-screen border-b top-0">
				<Navbar.Brand href="/">
					<img src={process.env.PUBLIC_URL + "/logo.png"} className="h-7 lg:h-10" alt="Bytesgram Logo" />
				</Navbar.Brand>

				{!cookies.access_token ? (
					<div className="flex md:order-2">
						<Button>
							<Link to="/auth">Get Started</Link>
						</Button>
						<Navbar.Toggle />
					</div>
				) : (
					<div className="flex md:order-2">
						<Button onClick={logout}>Logout</Button>
						<Navbar.Toggle />
					</div>
				)}

				<Navbar.Collapse>
					<Navbar.Link href="/">
						<div className={currentPage === "/" ? "flex items-center justify-center gap-2 mx-4 text-blue-500" : "flex items-center justify-center gap-2 mx-4"}>
							<AiOutlineHome size={20} />
							Home
						</div>
					</Navbar.Link>

					{userID && (
						<Navbar.Link href="/saved">
							<div className={currentPage === "/saved" ? "flex items-center justify-center gap-2 mx-4 text-blue-500" : "flex items-center justify-center gap-2 mx-4"}>
								<BsBookmark size={18} />
								Saved
							</div>
						</Navbar.Link>
					)}

					{userID && (
						<Navbar.Link href="/new">
							<div className={currentPage === "/new" ? "flex items-center justify-center gap-2 mx-4 text-blue-500" : "flex items-center justify-center gap-2 mx-4 lg:mr-20"}>
								<MdOutlineCreate size={20} />
								Create
							</div>
						</Navbar.Link>
					)}
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default TopBar;
