import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Str,
} from "@cloudflare/itty-router-openapi";
import { Ai } from "@cloudflare/ai";

export class Translate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		summary: "Translate a string",
		requestBody: {
			text: String,
			source_lang: new Str({ required: false }),
			target_lang: String,
		},
		responses: {
			"200": {
				description: "Returns the translation of the string",
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
		const result = await ai.run("@cf/meta/m2m100-1.2b", {
			text: data.body.text,
			source_lang: data.body.source_lang ?? "english",
			target_lang: data.body.target_lang,
		});

		return {
			success: true,
			response: result.translated_text,
		};
	}
}
