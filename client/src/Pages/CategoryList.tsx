import { AddItem } from "../Components/AddItemComponent";
import { ItemType } from "../Types/Item";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../redux/apiSlice";
import { CategoryType } from "../Types/Category";
import { Category } from "../Components/Category";
import { useState } from "react";
import { Spinner } from "../Components/Spinner";
import { PaginationManager } from "../Components/PaginationManager";
import { List } from "../Components/List";

export const CategoryList = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching } = useGetCategoriesQuery(page);
  const [addCategory, addCategoryResult] = useAddCategoryMutation();

  const handleAddItem = (item: ItemType) => {
    addCategory({
      name: item.content,
    });
  };

  const categories = data?.categories?.map((value: CategoryType) => (
    <Category category={value} key={value._id}></Category>
  ));
  console.log(isLoading);

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
