import { FC } from "react";
import Header from "../Header";

interface Props {
	children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<>
			<Header title="Herogram" />
			<div className="container mx-auto p-4">{children}</div>
		</>
	);
};

export default Layout;
