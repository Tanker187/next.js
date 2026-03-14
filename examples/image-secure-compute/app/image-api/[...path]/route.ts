// TODO: set origin here
const SOURCE_IMAGE_ORIGIN = "https://image-optimization-one.vercel.app";

/**
 * Validate that the requested image path is safe to proxy.
 * - Must start with a single leading slash (no protocol-relative //).
 * - May contain only a restricted set of characters.
 * - Must not be excessively long.
 */
function isSafeImagePath(path: string): boolean {
  if (!path || path.length > 1024) {
    return false;
  }
  // Require a single leading slash and disallow protocol-relative paths.
  if (!path.startsWith("/") || path.startsWith("//")) {
    return false;
  }
  // Allow only alphanumerics, slash, underscore, dash, and dot.
  const SAFE_PATH_REGEX = /^\/[a-zA-Z0-9/_\-.]*$/;
  return SAFE_PATH_REGEX.test(path);
}

export async function GET(req: Request) {
  if (!req.headers.get("user-agent")) {
    // TODO: add any other checks here
    return new Response("Forbidden", { status: 403 });
  }
  const path = new URL(req.url).pathname.slice("/image-api".length);
  if (!path) {
    return new Response("Bad Request", { status: 400 });
  }
  // Normalize and validate the requested path to mitigate SSRF-style issues.
  let normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Reject obvious path traversal or unexpected separators.
  if (normalizedPath.includes("..") || normalizedPath.includes("\\")) {
    return new Response("Bad Request", { status: 400 });
  }
  // Apply strict validation to prevent SSRF-style abuse.
  if (!isSafeImagePath(normalizedPath)) {
    return new Response("Bad Request", { status: 400 });
  }
  const res = await fetch(new URL(normalizedPath, SOURCE_IMAGE_ORIGIN));
  const { status, headers, body } = res;
  return new Response(body, { status, headers });
}
