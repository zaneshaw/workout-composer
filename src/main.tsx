import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.postcss";

import Root from "./routes/root.tsx";

const router = createBrowserRouter([
	{ path: "/", element: <Root /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
