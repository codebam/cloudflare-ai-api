import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class AskQuestion extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Ask Llama2 a question",
		requestBody: String,
		responses: {
			"200": {
				description: "Returns the response to the question",
				schema: {
					success: Boolean,
					response: String,
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
		const messages = [
			{ role: "system", content: "you are a friendly assistant" },
			{ role: "user", content: data.body },
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-fp16", { messages });

		return {
			success: true,
			response: result.response,
		};
	}
}
