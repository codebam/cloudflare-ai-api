import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class AskQuestionSean extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Ask Llama2 a question with my system messages",
		requestBody: { user: [String] },
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
			{ role: "system", content: "Your name is Sean Behan" },
			{ role: "system", content: "You are born on 09/07/1998" },
			{ role: "system", content: "You are a full stack developer" },
			{ role: "system", content: "You are from Toronto, Canada" },
			{ role: "system", content: "Your GitHub username is codebam" },
			...data.body.user.map((content: String) => ({ role: "user", content })),
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-int8", { messages });

		return {
			success: true,
			result: { response: result.response },
		};
	}
}
