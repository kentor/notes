export default function fromEntries<T>(
  iterable: Array<[string, T]>,
): {[key: string]: T} {
  const ret: {[key: string]: T} = {};
  return iterable.reduce((obj, entry) => {
    obj[entry[0]] = entry[1];
    return obj;
  }, ret);
}
