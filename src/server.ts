export async function api_validate(code: string, name: string | null = null): Promise<apiRouteValidateResponse | null> {
  const content = JSON.stringify({ code: code, name: name });
  const res = await fetch(`/api/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: content,
  });
  const result = await res.json();
  console.log(result);
  if (!("success" in result) || typeof result.success !== "boolean") return null;
  if (!("error" in result) || typeof result.error !== "string") return null;
  if (!("token" in result) || !(typeof result.token === "string" || typeof result.token === "object")) return null;
  return result;
}
