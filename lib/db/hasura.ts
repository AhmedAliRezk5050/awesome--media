const foo = async (
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
  token: string,
) => {
  if (!process.env.HASURA_END_POINT) {
    return undefined;
  }
  const response = await fetch(process.env.HASURA_END_POINT, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return response.json();
};

const operation = `
  query MyQuery {
    users {
      email
      id
      issuer
      publicAddress
    }
  }
`;

const hasuraApi = { foo };

export default hasuraApi;
