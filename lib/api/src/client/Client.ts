import { RequestPayload } from "../main.js";
import { paths } from "../spec.generated.js";
import { schemas } from "../types.js";
import { ClientResponse, Result } from "./types.js";

export class Client {
  readonly #origin: URL | string;

  constructor(options: { readonly origin: URL | string }) {
    this.#origin = options.origin;
  }

  #createRequestInit<
    Method extends keyof paths[Path],
    Path extends keyof paths
  >(method: Method, path: Path): Request {
    const url = new URL(path, this.#origin);
    return new Request(url, {
      method: String(method).toUpperCase(),
    });
  }

  async createPost(params: {
    body: string;
  }): Promise<Result<schemas["Post"], string>> {
    const request = this.#createRequestInit("post", "/api/posts");

    const body: RequestPayload<"/api/posts", "post">["application/json"] = {
      body: params.body,
    };

    const res = (await fetch(request, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })) as ClientResponse<"/api/posts", "post">;

    switch (res.status) {
      case 201: {
        const payload = await res.json();
        return [null, payload.post];
      }

      case 400: {
        return ["Bad Request"];
      }

      default:
        return ["Unexpected Response"];
    }
  }
}
