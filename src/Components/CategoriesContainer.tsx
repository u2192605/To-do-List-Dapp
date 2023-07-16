import { Card } from "./Card";
import { Category } from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addCategory } from "../redux/categorySlice";
import { v4 as uuidv4 } from 'uuid';

import { AddItem } from "./addItem";
import { ItemType } from "../Types/Item";


export const CateogoriesContainer = () => {
    const categories = useSelector((state: RootState) => state.category.categories)
    const dispatch = useDispatch()

    const handleAddItem = (item: ItemType) => {
        const id = uuidv4()
        dispatch(addCategory({
            id,
            name: item.content,
            color: item.color ?? '000000'
        }))
    }
    return (
        <>
            {/* <h3>Categories</h3> */}
            <Card vertical={true}>
                {categories.map((value) =>
                    <Category category={value} key={value.id}></Category>
                )}
            </Card>
            <AddItem onAddItem={(item) => handleAddItem(item)}/>
        </>
    )
};