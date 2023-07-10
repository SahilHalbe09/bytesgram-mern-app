import React from "react";
import { Footer } from "flowbite-react";

const BottomBar = () => {
	return (
		<Footer container>
			<div className="w-full text-center">
				<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
					<Footer.Brand alt="Bytesgram Logo" href="https://www.thesahildev.in/" src={process.env.PUBLIC_URL + "/logo.png"} />
					<Footer.LinkGroup>
						<Footer.Link href="/">About</Footer.Link>
						<Footer.Link href="/">Privacy Policy</Footer.Link>
						<Footer.Link href="/create">Create</Footer.Link>
						<Footer.Link href="/auth">Login</Footer.Link>
						<Footer.Link href="https://www.thesahildev.in/">Contact</Footer.Link>
					</Footer.LinkGroup>
				</div>
				<Footer.Divider />
				<Footer.Copyright by="Sahil Halbe™" href="https://www.thesahildev.in/" year={2023} />
			</div>
		</Footer>
	);
};

export default BottomBar;
