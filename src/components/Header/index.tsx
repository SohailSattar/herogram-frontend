import React, { FC } from "react";
import headerLinks from "../../data/header-links";
import { Link, useNavigate } from "react-router-dom";

import * as RoutePath from "../../RouteConfig";

interface Props {
	title: string;
}

const Header: FC<Props> = ({ title }) => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		navigate(RoutePath.LOGIN);
	};

	return (
		<header className="bg-gray-800 p-4">
			<h1 className="text-white text-2xl font-bold">{title}</h1>
			<nav className="mt-4 flex justify-between items-center">
				<ul className="flex space-x-4">
					{headerLinks.map((item, index) => (
						<li key={index} className="text-white hover:text-gray-400">
							<Link to={item.url}>{item.name}</Link>
						</li>
					))}
				</ul>
				<button
					className="text-white hover:text-gray-400"
					onClick={logoutHandler}
				>
					Logout
				</button>
			</nav>
		</header>
	);
};

export default Header;
