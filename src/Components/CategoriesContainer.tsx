import { Card } from "./Card";
import { Category } from "./Category";
import { v4 as uuidv4 } from 'uuid';

import { AddItem } from "./addItem";
import { ItemType } from "../Types/Item";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../Services/CategoryAPI";
import { CategoryType } from "../Types/Category";


export const CateogoriesContainer = () => {
    const {data, error, isLoading} = useGetCategoriesQuery('')
    console.log(data, 'cat')
    // const dispatch = useDispatch()
    const [addCategory, result] = useAddCategoryMutation();

    const handleAddItem = (item: ItemType) => {
        const id = uuidv4()
        addCategory({
            id,
            name: item.content,
            color: item.color ?? '#000000'
        })
    }
    
    return (
        <>
            {/* <h3>Categories</h3> */}
            <Card vertical={true}>
                {data?.map((value: CategoryType) =>
                    <Category category={value} key={value.id}></Category>
                )}
            </Card>
            <AddItem onAddItem={(item) => handleAddItem(item)}/>
        </>
    )
};