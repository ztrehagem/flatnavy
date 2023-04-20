import { apiOrigin } from "../lib/api.js";

export enum RequestType {
  createSession,
  refreshSession,
  revokeSession,
  useSession,
  bypass,
}

export const detectRequestType = (request: Request): RequestType => {
  const method = request.method.toUpperCase();
  const { pathname, origin } = new URL(request.url);

  if (method == "POST" && pathname == "/api/users") {
    return RequestType.createSession;
  }

  if (method == "POST" && pathname == "/api/auth") {
    return RequestType.createSession;
  }

  if (method == "PUT" && pathname == "/api/auth") {
    return RequestType.refreshSession;
  }

  if (method == "DELETE" && pathname == "/api/auth") {
    return RequestType.revokeSession;
  }

  if (origin == apiOrigin) {
    return RequestType.useSession;
  }

  return RequestType.bypass;
};
