let counter = 0;

export function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${++counter}`;
}
