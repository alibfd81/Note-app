import axios from "axios"
import { createContext, useContext, useEffect, useReducer } from "react"
import toast from "react-hot-toast"

const CategoryProvider = createContext()


const initialState = {
    isLoading: false,
    selectCategory: [],
    error: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "category/loaded":
            return {
                ...state,
                isLoading: false,
                selectCategory: action.payload
            }
        case "create/category":
            return {
                ...state,
                isLoading: false,
                selectCategory: [...state.selectCategory, action.payload]
            }
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
    }

}
function CategoryContext({ children }) {
    const [{ isLoading, selectCategory }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getCategory() {
            dispatch({ type: "loading" })
            try {
                const { data } = await axios.get("http://localhost:4000/category")
                dispatch({ type: "category/loaded", payload: data })
            }
            catch (error) {
                dispatch({ type: "rejected", payload: error })
            }
        }
        getCategory()
    }, [])

    async function postCategory(lastCategory) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post("http://localhost:4000/category", lastCategory)
            dispatch({ type: "create/category", payload: data })
            toast.success("دسته بندی با موفقیت افزوده شد")
        } catch (error) {
            toast.error("دسته بندی افزوده نشد")
            dispatch({ type: "rejected", payload: error })
        }
    }


    return (
        <CategoryProvider.Provider value={{ selectCategory, isLoading, postCategory }}>
            {children}
        </CategoryProvider.Provider>
    )
}

export default CategoryContext

export function useCategories() {
    return useContext(CategoryProvider)
}
