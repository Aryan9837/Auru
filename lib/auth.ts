import { verifyToken } from "@clerk/backend";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

export async function getUserFromRequest(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    const verified = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
    });
    return verified.sub;
  } catch {
    return null;
  }
}
