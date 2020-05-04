exports.handler = async (event) => {
  const lat = event.queryStringParameters.name || 45;

  return {
    statusCode: 200,
    body: `Hello ${subject}`,
  };
};
