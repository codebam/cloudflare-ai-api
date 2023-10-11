import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class AskQuestionAdvanced extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Ask Llama2 a question with a given system message",
		requestBody: { system: [String], user: [String] },
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
			...data.body.system?.map((content) => ({ role: "system", content })),
			...data.body.user.map((content) => ({ role: "user", content })),
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-int8", { messages });

		return {
			success: true,
			response: result.response,
		};
	}
}
