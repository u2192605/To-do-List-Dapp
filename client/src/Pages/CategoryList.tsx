import { AddItem } from "../Components/AddItemComponent";
import { ItemType } from "../Types/Item";
import {
  api,
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../redux/apiSlice";
import { CategoryType } from "../Types/Category";
import { Category } from "../Components/Category";
import { useState } from "react";
import { Spinner } from "../Components/Spinner";
import { PaginationManager } from "../Components/PaginationManager";
import { List } from "../Components/List";
import { redirect } from "react-router-dom";
import { store } from "../redux/store";



export const Component = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching } = useGetCategoriesQuery(page);
  const [addCategory, addCategoryResult] = useAddCategoryMutation();

  const handleAddItem = (item: ItemType) => {
    addCategory({
      name: item.name,
    });
  };

  if (data && data.totalPages !== 0 && data.totalPages < page + 1) {
    console.log(page, data.totalPages, "here");
    setPage(data.totalPages - 1);
  }

  const categories = data?.categories?.map((value: CategoryType) => (
    <Category category={value} key={value._id}></Category>
  ));


  return (
    <List
      totalPages={data?.totalPages || 0}
      children={{
        title: <div className="text-2xl mt-6">Categories</div>,
        items: isLoading ? <Spinner length={16} /> : categories,
        paginationManager: data?.totalPages ? (
          <PaginationManager
            page={page}
            totalPages={data.totalPages}
            changePage={setPage}
          />
        ) : (
          <div className="text-xl">Nothing yet</div>
        ),
        AddItem: (
          <AddItem
            onAddItem={(item) => handleAddItem(item)}
            isPerformingQuery={addCategoryResult?.isLoading}
          />
        ),
      }}
    />
  );
};

Component.diplayName  = 'CategoryList'

export const  loader = async ({params}:any) => {
  
  const token = store.getState().auth.token;
  if (!token) {
    throw redirect("/login");
  }
  const p = store.dispatch(api.endpoints.getCategories.initiate(0));
  try {
    const response = await p.unwrap();
    return response;
  } catch (error) {
    return error;
  } finally {
    p.unsubscribe();
  }
};

loader.diplayName  = 'CategoryListLoader'