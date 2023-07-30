import { AddItem } from "../Components/AddItem";
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

export const CategoryList = () => {
  // const { token, userID } = JSON.parse(localStorage.getItem("user") as string);
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching } = useGetCategoriesQuery(page);

  // const dispatch = useDispatch()
  const [addCategory, addCategoryResult] = useAddCategoryMutation();

  const handleAddItem = (item: ItemType) => {
    addCategory({
      name: item.content,
    });
  };

  const categories = data?.categories?.map((value: CategoryType) => (
    <Category category={value} key={value._id}></Category>
  ));

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col justify-start items-center w-7/12 h-full
        mx-auto space-y-6"
      >
        <div className="text-2xl mt-6">Categories</div>

        {isLoading ? <Spinner /> : categories}

        {data?.totalPages ? (
          <PaginationManager
            page={page}
            totalPages={data.totalPages}
            changePage={setPage}
          />
        ) : (
          <div className="text-xl">Nothing yet</div>
        )}
      </div>
      <AddItem
        onAddItem={(item) => handleAddItem(item)}
        isPerformingQuery={addCategoryResult?.isLoading}
      />
    </div>
  );
};
