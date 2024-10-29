import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import * as RoutePath from "./RouteConfig";
import Layout from "./components/Layout";
import { FilesPage, HomePage } from "./pages";
import FileDetailsPage from "./pages/Files/Details";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import FileUploadPage from "./pages/Files/FileUpload";

function App() {
	return (
		<Router>
			<Routes>
				{/* Login */}
				<Route
					path={RoutePath.LOGIN}
					element={
						<AuthProvider>
							<Layout>
								<LoginPage />
							</Layout>
						</AuthProvider>
					}
				></Route>
				<Route
					path={RoutePath.ROOT}
					element={
						<Layout>
							<HomePage />
						</Layout>
					}
				></Route>
				{/* Files */}
				<Route
					path={RoutePath.FILES}
					element={
						<Layout>
							<FilesPage />
						</Layout>
					}
				></Route>
				<Route
					path={RoutePath.FILES_DETAILS}
					element={
						<Layout>
							<FileDetailsPage />
						</Layout>
					}
				></Route>
				<Route
					path={RoutePath.FILES_NEW}
					element={
						<Layout>
							<FileUploadPage />
						</Layout>
					}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
