export function FilterData<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const entries = Object.entries(obj).filter(
    ([key]) => !keys.includes(key as K)
  );
  return Object.fromEntries(entries) as Omit<T, K>;
}
