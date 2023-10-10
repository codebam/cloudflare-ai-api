import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class AskQuestionAdvanced extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Ask Llama2 a question with a given system message",
		requestBody: { system: String, user: String },
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
		const ai = new Ai(env.AI);
		const messages = [
			{ role: "system", content: data.body.system },
			{ role: "user", content: data.body.user },
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-int8", { messages });

		return {
			success: true,
			result: { response: result.response },
		};
	}
}
