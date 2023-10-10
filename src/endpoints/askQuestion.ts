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
					result: {
						response: String,
					},
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
		console.log(JSON.stringify(env.AI, null, 2));
		const ai = new Ai(env.AI);
		const { result } = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
			prompt: data.body,
		});
		console.log(result);

		return {
			success: true,
			result,
		};
	}
}
