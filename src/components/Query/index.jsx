import { useQuery } from '@apollo/client';

export const Query = ({
  children,
  query,
  variables = {},
  notifyOnNetworkStatusChange = false,
  ...rest
}) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(query, {
    variables,
    notifyOnNetworkStatusChange
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return children({ ...rest, loading, data, refetch, networkStatus });
};
