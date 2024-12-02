const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL)

if (!BASE_URL) {
  throw new Error("No base url provided");
}

export { BASE_URL };
