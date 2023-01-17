import { useAppSelector } from '../redux/hooks';

export const useHighlight = (text: string) => {
  const searchValue = useAppSelector((state) => state.filterReducer.searchValue);

  const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));

  return (
    <span>
      {parts.map((part) =>
        part.toLowerCase() === searchValue.toLowerCase() ? <mark>{part}</mark> : part,
      )}
    </span>
  );
};
