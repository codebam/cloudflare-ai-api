import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { AskQuestion } from "./endpoints/askQuestion";
import { AskQuestionAdvanced } from "./endpoints/askQuestionAdvanced";
import { AskQuestionSean } from "./endpoints/askQuestionSean";
import { SentimentAnalysis } from "./endpoints/sentimentAnalysis";
import { Translate } from "./endpoints/translate";
import { createCors } from "itty-router";

export const router = OpenAPIRouter({
	schema: {
		info: {
			title: "Cloudflare AI API",
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
router.post("/api/sentiment", SentimentAnalysis);
router.post("/api/translate", Translate);

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
