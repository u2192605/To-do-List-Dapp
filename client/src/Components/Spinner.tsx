import { FC } from "react"

interface Props{
    length?: number,
}
export const Spinner: FC<Props> = ({length = 16}) =>{
    console.log('spin')
    return(
        <div>
            <div className={`border-${length / 2} border-teal-500 border-t-transparent border-r-transparent border-l-transparent
            h-${length} w-${length} rounded-full animate-spin`}>
            </div>
        </div>
    )
  }