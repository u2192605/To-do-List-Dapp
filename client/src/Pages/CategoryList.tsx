import { Card } from "../Components/Card";
// import { Category } from "../Components/category";

import { AddItem } from "../Components/addItem";
import { ItemType } from "../Types/Item";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../redux/apiSlice";
import { CategoryType } from "../Types/Category";
import { Category } from "../Components/Category";

export const CategoryList = () => {
  // const { token, userID } = JSON.parse(localStorage.getItem("user") as string);
  const { data, error, isLoading } = useGetCategoriesQuery();
  // const dispatch = useDispatch()
  const [addCategory, result] = useAddCategoryMutation();

  const handleAddItem = (item: ItemType) => {
    addCategory({
      name: item.content,
      color: item.color ?? "#FFFFFF",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card
        className="flex flex-col justify-start items-center w-7/12 h-full
        mx-auto space-y-6"
        vertical={true}
      >
        <div
          className="text-2xl mt-6"
        >
          Categories
        </div>
        {data?.map((value: CategoryType) => (
          <Category category={value} key={value._id}></Category>
        ))}
      </Card>
      <AddItem
        canChooseColor={true}
        onAddItem={(item) => handleAddItem(item)}
      />
    </div>
  );
};
