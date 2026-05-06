const GTAG_ID = "G-M9R2C6BWNL";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const isLocalHost = () =>
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1";

const loadAnalytics = () => {
	if (document.querySelector(`script[src*="${GTAG_ID}"]`)) {
		return;
	}

	window.dataLayer = window.dataLayer ?? [];
	window.gtag = (...args: unknown[]) => {
		window.dataLayer?.push(args);
	};
	window.gtag("js", new Date());
	window.gtag("config", GTAG_ID);

	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
	document.head.appendChild(script);
};

const requestIdle = (callback: () => void) => {
	if ("requestIdleCallback" in window) {
		window.requestIdleCallback(callback, { timeout: 3000 });
		return;
	}

	globalThis.setTimeout(callback, 2000);
};

export const scheduleAnalytics = () => {
	if (!import.meta.env.PROD || isLocalHost()) {
		return;
	}

	const schedule = () => requestIdle(loadAnalytics);

	if (document.readyState === "complete") {
		schedule();
		return;
	}

	window.addEventListener("load", schedule, { once: true });
};
