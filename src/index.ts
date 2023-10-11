import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { AskQuestion } from "./endpoints/askQuestion";
import { AskQuestionAdvanced } from "./endpoints/askQuestionAdvanced";
import { AskQuestionSean } from "./endpoints/askQuestionSean";
import { createCors } from "itty-router";

export const router = OpenAPIRouter({
	schema: {
		info: {
			title: "Llama2 API",
			version: "1.0",
		},
	},
	docs_url: "/",
});

const { preflight, corsify } = createCors();

// embed preflight upstream to handle all OPTIONS requests
router.all("*", preflight);

router.post("/api/question/", AskQuestion);
router.post("/api/question/custom", AskQuestionAdvanced);
router.post("/api/question/sean", AskQuestionSean);

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
	fetch: async (request, env, ctx) =>
		router.handle(request, env, ctx).then(corsify),
};
