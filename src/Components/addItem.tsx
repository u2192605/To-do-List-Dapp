import { useDispatch, useSelector } from 'react-redux'
import './addItem.css'
import { RootState } from '../redux/store'
import { setColor, setContent } from '../redux/itemSlice'
import React, { FC } from 'react'
import { ItemType } from '../Types/Item'
interface Props {
    onAddItem: (item: ItemType) => void;
}
export const AddItem: FC<Props> = ({ onAddItem }) => {
    const { content, color } = useSelector((state: RootState) => state.item.input)
    const dispatch = useDispatch()
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setContent(event.target.value))
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(event.target.value))
    }

    return (
        <>
            <form className="add-item">
                <textarea placeholder="Enter item name"
                    value={content}
                    onChange={(event) => handleContentChange(event)}
                />
                {/* <input type="color"
                    value={color}
                    onChange={(event) => handleColorChange(event)}
                /> */}
                <input type="button"
                    onClick={() => onAddItem({ content })} value='Add' />
            </form>
        </>
    )
}