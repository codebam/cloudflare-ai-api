import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class SentimentAnalysis extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Do sentiment analysis on a string",
		requestBody: String,
		responses: {
			"200": {
				description: "Returns the sentiment of each item",
				schema: {
					success: Boolean,
					response: {},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const ai = new Ai(env.AI);
		const result = await ai.run("@cf/huggingface/distilbert-sst-2-int8", {
			text: data.body,
		});

		return {
			success: true,
			response: result,
		};
	}
}
