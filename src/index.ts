import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { AskQuestion } from "./endpoints/askQuestion";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.post("/api/question/", AskQuestion);

router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
