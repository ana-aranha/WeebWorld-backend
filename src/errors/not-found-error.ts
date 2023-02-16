export function notFoundError(): { name: string; message: string } {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}
