interface JsonInit {
  body: string;
  headers: {
    "Content-Type": "application/json"
  }
}

export function buildJsonInit(payload: Record<string, unknown>): JsonInit {

} 
