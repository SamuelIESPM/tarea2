import { useContext } from "react";
import { ContextOfList } from "../contexts/ListContext.jsx";

const useListContext = () => {
  const context = useContext(ContextOfList);
  return context;
};

export default useListContext;
