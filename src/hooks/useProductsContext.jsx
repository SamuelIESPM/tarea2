import { useContext } from "react";
import { ContextOfProducts } from "../contexts/ProductsContext.jsx";

const useProductsContext = () => {
  const context = useContext(ContextOfProducts);
  return context;
};

export default useProductsContext;
