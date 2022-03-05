const fetchGraphQL = async (
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
) => {
  if (!process.env.HASURA_END_POINT) {
    return undefined;
  }
  const response = await fetch(process.env.HASURA_END_POINT, {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret':
        'YzxK7K9PW84JiaNay4X7lCdRMShDnS5MhBSKGNoHJcczlAF19bv8HgKduryoLlv6',
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

export const fetchMyQuery = () => fetchGraphQL(operation, 'MyQuery', {});
