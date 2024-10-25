import { useState, useCallback, useEffect, useRef } from 'react';

const useScrollLoad = (initialTodosPerPage, increment) => {
  const [todosPerPage, setTodosPerPage] = useState(initialTodosPerPage);
  const listRef = useRef(null);
  const handleScroll = useCallback(() => {
    if (
      listRef.current.scrollTop + listRef.current.clientHeight >=
      listRef.current.scrollHeight
    ) {
      setTodosPerPage((prev) => prev + increment);
    }
  }, [increment]);
  
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  return { listRef, todosPerPage };
};
export default useScrollLoad;
