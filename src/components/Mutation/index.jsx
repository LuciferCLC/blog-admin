import { useMutation } from '@apollo/client';

import { deleteCache } from '@/utils';

export const Mutation = ({
  mutation,
  refetch,
  children,
  ItemName,
  shouldDeleteCache = true
}) => {
  const [newMutation, { loading }] = useMutation(mutation, {
    update: (cache) => {
      shouldDeleteCache && deleteCache(cache, ItemName);
      shouldDeleteCache && refetch && refetch();
    }
  });

  return children({ mutation: newMutation, loading });
};
