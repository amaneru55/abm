export default function queryStringWithNil(params: Record<string, unknown>): string {
  const parts: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        parts.push(`${key}=${item}`)
      }
    } else {
      parts.push(`${key}=${value}`)
    }
  }

  return '?' + parts.join('&')
}
