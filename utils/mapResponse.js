export const mapResponse = ({ data, error, mutate, isValidating }) => {
  return {
    res: data,
    isLoading: isValidating,
    mutate,
    error,
  };
};
