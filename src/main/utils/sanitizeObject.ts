export function sanitizeObject(object: Record<string, string> = {}) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!value) return acc;

    return {
      ...acc,
      [key]: value,
    };
  }, {});
}
