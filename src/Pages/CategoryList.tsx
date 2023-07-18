import { Card } from "../Components/Card";
// import { Category } from "../Components/category";
import { v4 as uuidv4 } from 'uuid';

import { AddItem } from "../Components/addItem";
import { ItemType } from "../Types/Item";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../redux/apiSlice";
import { CategoryType } from "../Types/Category";
import { Category } from "../Components/Category";


export const CategoryList = () => {
    const { data, error, isLoading } = useGetCategoriesQuery('')
    console.log(data, 'cat')
    // const dispatch = useDispatch()
    const [addCategory, result] = useAddCategoryMutation();

    const handleAddItem = (item: ItemType) => {
        const id = uuidv4()
        addCategory({
            id,
            name: item.content,
            color: item.color ?? '#FFFFFF'
        })
    }

    return (
        <>
            <Card vertical={true}>
                <h3>Categories</h3>
                {data?.map((value: CategoryType) =>
                    <Category category={value} key={value.id}></Category>
                )}
            </Card>
            <AddItem canChooseColor={true}
                onAddItem={(item) => handleAddItem(item)}
            />
        </>
    )
};