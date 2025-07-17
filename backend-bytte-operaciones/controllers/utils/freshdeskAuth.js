export function getFreshdeskAuthHeader(apiKey) {
  const encodedApiKey = Buffer.from(`${apiKey}:X`).toString("base64");
  return `Basic ${encodedApiKey}`;
}
