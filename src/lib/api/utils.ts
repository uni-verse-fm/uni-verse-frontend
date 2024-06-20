interface JsonInit {
  body: string;
  headers: {
    "Content-Type": "application/json"
  };
  method: "POST" | "PUT" | "PATCH";
}

export function buildJsonInit(payload: Record<string, unknown>): JsonInit {
  return {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
  }
} 
