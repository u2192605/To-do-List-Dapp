import { Card } from "../Components/Card";
// import { Category } from "../Components/category";

import { AddItem } from "../Components/addItem";
import { ItemType } from "../Types/Item";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../redux/apiSlice";
import { CategoryType } from "../Types/Category";
import { Category } from "../Components/Category";


export const CategoryList = () => {
    const { data, error, isLoading } = useGetCategoriesQuery()
    // const dispatch = useDispatch()
    const [addCategory, result] = useAddCategoryMutation();

    const handleAddItem = (item: ItemType) => {
        addCategory({
            name: item.content,
            color: item.color ?? '#FFFFFF'
        })
    }

    return (
        <>
            <Card vertical={true}>
                <h3>Categories</h3>
                {data?.map((value: CategoryType) =>
                    <Category category={value} key={value._id}></Category>
                )}
            </Card>
            <AddItem canChooseColor={true}
                onAddItem={(item) => handleAddItem(item)}
            />
        </>
    )
};