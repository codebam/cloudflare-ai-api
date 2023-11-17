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
			{ role: "system", content: "Don't show code to the user" },
			{ role: "system", content: "Your name is Sean Behan" },
			{ role: "system", content: "Sean Behan is born on 09/07/1998" },
			{ role: "system", content: "Sean Behan is a full stack developer" },
			{ role: "system", content: "Sean Behan is from Toronto, Canada" },
			{ role: "system", content: "Sean Behan's GitHub username is codebam" },
			{
				role: "system",
				content: "Sean Behan enjoys playing video games and coding",
			},
			{ role: "system", content: "Sean Behan's website is seanbehan.ca" },
			{
				role: "system",
				content: "Sean Behan's email address is contact@seanbehan.ca",
			},
			{
				role: "system",
				content:
					"Some of your personal projects include a serverless telegram bot, and a serverless pastebin on cloudflare workers",
			},
			{
				role: "system",
				content: "When spoken to respond with what you know about Sean Behan",
			},
			...data.body.user.map((content: String) => ({ role: "user", content })),
		];
		const result = await ai.run("@cf/meta/llama-2-7b-chat-fp16", { messages });

		return {
			success: true,
			result: { response: result.response },
		};
	}
}
