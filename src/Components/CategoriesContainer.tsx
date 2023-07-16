import { Card } from "./Card";
import { Category} from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { Fragment } from "react";
import { addCategory } from "../redux/categorySlice";
import { v4 as uuid } from 'uuid';


export const CateogoriesContainer = () => {
    const categories = useSelector((state: RootState) => state.category.categories)
    const dispatch = useDispatch()

    const handleAddCategory = ()=>{
        dispatch(addCategory({id:uuid(), name:'test'}))
    }
    return (
        <>
            {/* <h3>Categories</h3> */}
            <Card vertical={true}>
                {categories.map((value) =>
                    <Category category={value}></Category>
                )}
                <input type="button" value={"add category"} onClick={handleAddCategory}/>
            </Card>

        </>
    )
};