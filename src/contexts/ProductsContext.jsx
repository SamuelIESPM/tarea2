import React, { createContext, useState, useEffect } from "react";
import { supabaseConnection } from "../config/supabase.js";

const ContextOfProducts = createContext();

const productsContext = ({ children }) => {
  const initialListValue = [];
  const initialSituation = "Loading...";
  const initialProductValue = {
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
    weight: "",
  };

  const [productsList, setProductsList] = useState(initialListValue);
  const [situation, setSituation] = useState(initialSituation);
  const [product, setProduct] = useState(initialProductValue);

  //Obtain all products form the products table
  const getProducts = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .select("*");
      if (error) throw error;
      setProductsList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  //Orders by ascending/descending name.
  const orderProducts = async (order) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .select("*")
        .order("name", { ascending: order });
      if (error) throw error;
      setProductsList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  //Searchs by name.
  const searchProduct = async (search) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .select("*")
        .ilike("name", `%${search}%`);
      if (error) throw error;
      setProductsList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  //Searchs the products under the specified price.
  const maxPrice = async (search) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .select("*")
        .lte("price", search);
      if (error) throw error;
      setProductsList(data);
    } catch (error) {
      if (error.message == `invalid input syntax for type real: ""`) {
        setSituation("No se encontraron productos con el precio especificado.");
      } else setSituation(error.message);
    }
  };

  const selectProduct = async (productId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .select("*")
        .eq("id", productId);
      if (error) throw error;
      setProduct(data[0]);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const createProduct = async (newProduct) => {
    try {
      console.log(newProduct);
      const { data, error } = await supabaseConnection
        .from("products")
        .insert(newProduct);
      if (error) throw error;
      getProducts();
    } catch (error) {
      setSituation(error.message);
    }
  };

  const updateProduct = async (toUpdateProduct) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .update([toUpdateProduct])
        .eq("id", toUpdateProduct.id);
      if (error) throw error;
      getProducts();
    } catch (error) {
      setSituation(error.message);
    }
  };

  const deleteProduct = async (toRemoveProduct) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products")
        .delete()
        .eq("id", toRemoveProduct);
      if (error) throw error;
      getProducts();
    } catch (error) {
      setSituation(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const exportData = {
    productsList,
    getProducts,
    situation,
    orderProducts,
    searchProduct,
    maxPrice,
    product,
    setProduct,
    selectProduct,
    initialProductValue,
    createProduct,
    deleteProduct,
    updateProduct,
  };

  return (
    <ContextOfProducts.Provider value={exportData}>
      {children}
    </ContextOfProducts.Provider>
  );
};

export default productsContext;

export { ContextOfProducts };
