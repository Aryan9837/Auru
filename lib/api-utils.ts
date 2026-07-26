import { NextResponse } from "next/server";
import { getUserFromRequest } from "./auth";

type ApiHandler = (userId: string, req: Request) => Promise<Response>;

type ApiHandlerWithParams<T> = (
  userId: string,
  params: T,
  req: Request
) => Promise<Response>;

/**
 * Wraps an API route handler with authentication and error handling.
 * Use for routes without dynamic params.
 */
export function withAuth(handler: ApiHandler) {
  return async (req: Request) => {
    try {
      const userId = await getUserFromRequest(req);
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return handler(userId, req);
    } catch (error) {
      console.error("API error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

/**
 * Wraps an API route handler with authentication and error handling.
 * Use for routes with dynamic params.
 */
export function withAuthParams<T extends Record<string, string>>(
  handler: ApiHandlerWithParams<T>
) {
  return async (req: Request, routeContext: { params: Promise<T> }) => {
    try {
      const userId = await getUserFromRequest(req);
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const params = await routeContext.params;
      return handler(userId, params, req);
    } catch (error) {
      console.error("API error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
