import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { BlogPost } from "@/components/Blog/BlogPost";
import { Home } from "@/views/Home";
import { NotFound } from "@/views/NotFound";

type AnchorRedirectProps = {
	hash: string;
};

function AnchorRedirect({ hash }: AnchorRedirectProps) {
	useEffect(() => {
		window.location.replace(`/${hash}`);
	}, [hash]);

	return null;
}

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/works" element={<AnchorRedirect hash="#works" />} />
				<Route path="/blog" element={<AnchorRedirect hash="#blog" />} />
				<Route path="/blogs" element={<AnchorRedirect hash="#blog" />} />
				<Route path="/blog/:slug" element={<BlogPost />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
