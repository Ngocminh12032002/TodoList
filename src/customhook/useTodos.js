import { useState, useCallback, useEffect, useRef } from 'react';

const useScrollLoad = (TodosPerPage, increment) => {
  const [todosPerPage, setTodosPerPage] = useState(TodosPerPage);
  const listRef = useRef(null);

  const handleScroll = () => {
    if (
      listRef.current.scrollTop + listRef.current.clientHeight >=
      listRef.current.scrollHeight
    ) {
      setTodosPerPage((prev) => prev + increment);
    }
  };

  useEffect(() => {
    listRef.current.addEventListener("scroll", handleScroll);

    return () => {
      listRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { listRef, todosPerPage };
};

export default useScrollLoad