import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { scheduleAnalytics } from "@/lib/analytics";

const root = document.getElementById("app");

if (!root) {
	throw new Error("Missing #app root element");
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

scheduleAnalytics();
