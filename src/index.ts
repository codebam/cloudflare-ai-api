import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { AskQuestion } from "./endpoints/askQuestion";
import { AskQuestionAdvanced } from "./endpoints/askQuestionAdvanced";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.post("/api/question/", AskQuestion);
router.post("/api/question/custom", AskQuestionAdvanced);

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
