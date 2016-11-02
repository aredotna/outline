export default function graphqlErrorHandler(query) {
  return error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
  });
}
