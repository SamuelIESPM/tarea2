import React, { createContext, useState, useEffect } from "react";
import { supabaseConnection } from "../config/supabase.js";
import useUserContext from "../hooks/useUserContext.jsx";

const ContextOfList = createContext();

const listContext = ({ children }) => {
  const { user } = useUserContext();
  const initialListValue = {
    id: "",
    name: "",
  };
  const initialListsValue = [];
  const initialSituation = "Listas no encontradas";

  const [listsList, setListsList] = useState(initialListsValue);
  const [list, setList] = useState(initialListValue);
  const [situation, setSituation] = useState(initialSituation);
  const [productsOnList, setProductsOnList] = useState(initialListsValue);

  const getLists = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("shoppingLists")
        .select("*")
        .eq("creator", user.id);
      if (error) throw error;
      setListsList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const createList = async (newList) => {
    try {
      const { data, error } = await supabaseConnection
        .from("shoppingLists")
        .insert(newList);
      if (error) throw error;
      getLists();
    } catch (error) {
      setSituation(error.message);
    }
  };

  const getProductsFromList = async (selectedListId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products_on_lists")
        .select("*")
        .eq("list_id", selectedListId);
      if (error) throw error;
      setProductsOnList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const addProductToList = async (newProduct) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products_on_lists")
        .insert([newProduct]);
      if (error) throw error;
    } catch (error) {
      setSituation(error.message);
    }
  };

  const editProductQuantity = async (newQuantity) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products_on_lists")
        .update(newQuantity)
        .eq("product_id", newQuantity.product_id)
        .eq("list_id", newQuantity.list_id);
      if (error) throw error;
      getProductsFromList(newQuantity.list_id);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const removeProductFromList = async (removeProduct) => {
    try {
      const { data, error } = await supabaseConnection
        .from("products_on_lists")
        .delete()
        .eq("product_id", removeProduct.product_id)
        .eq("list_id", removeProduct.list_id);
      if (error) throw error;
      getProductsFromList(removeProduct.list_id);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const selectList = async (listId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("shoppingLists")
        .select("*")
        .eq("id", listId);
      if (error) throw error;
      setList(data);
    } catch (error) {
      setSituation(error.message);
    }
  };

  const deleteList = async (listId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("shoppingLists")
        .delete()
        .eq("id", listId);
      if (error) throw error;
      getLists();
    } catch (error) {
      setSituation(error.message);
    }
  };

  useEffect(() => {
    getLists();
  }, [user]);

  const exportData = {
    getLists,
    createList,
    listsList,
    situation,
    addProductToList,
    editProductQuantity,
    selectList,
    list,
    setList,
    getProductsFromList,
    removeProductFromList,
    initialListValue,
    productsOnList,
    deleteList,
  };

  return (
    <ContextOfList.Provider value={exportData}>
      {children}
    </ContextOfList.Provider>
  );
};

export default listContext;

export { ContextOfList };
