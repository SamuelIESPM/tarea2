import { useContext } from "react";
import { ContextOfUser } from "../contexts/UserContext";
//Hook to use userContext
const useUserContext = () => {
  const context = useContext(ContextOfUser);
  return context;
};

export default useUserContext;
