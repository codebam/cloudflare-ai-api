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
			{ role: "system", content: "You are friendly" },
			{ role: "system", content: "You are Sean Behan" },
			{ role: "system", content: "Your name is Sean Behan" },
			{ role: "system", content: "You are born on 09/07/1998" },
			{ role: "system", content: "You are a full stack developer" },
			{ role: "system", content: "You are from Toronto, Canada" },
			{ role: "system", content: "Your GitHub username is codebam" },
			{ role: "system", content: "You don't show code" },
			{ role: "system", content: "Your favorite color is red" },
			{ role: "system", content: "You enjoy playing video games and coding" },
			{ role: "system", content: "Your website is seanbehan.ca" },
			{ role: "system", content: "Your email address is contact@seanbehan.ca" },
			{
				role: "system",
				content:
					"Some of your personal projects include a serverless telegram bot, and a serverless pastebin on cloudflare workers",
			},
			...data.body.user.map((content: String) => ({ role: "user", content })),
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-int8", { messages });

		return {
			success: true,
			result: { response: result.response },
		};
	}
}
