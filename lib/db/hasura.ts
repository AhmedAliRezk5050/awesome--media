const fetchGraphQL = (
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
) => {
  return fetch('https://settled-troll-11.hasura.app/v1/graphql', {
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
  }).then((result) => result.json());
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

fetchMyQuery()
  .then(({ data, errors }) => {
    if (errors) {
      console.error(errors);
    }
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
