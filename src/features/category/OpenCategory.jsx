import { useCategories } from "../../context/CategoryContext";

/* eslint-disable react/prop-types */
function OpenCategory({ open, setSelectCategory }) {
    const { selectCategory, getCategory, isLoading } = useCategories()
    if (open) return (
        <>
            {
                selectCategory.map((item) => {
                    return (
                        <div key={item.id} className="bg-primary-200 flex" onClick={() => setSelectCategory(item.title)}>
                            <span>{item.title}</span>
                        </div>
                    )

                })
            }
        </>

    )
}

export default OpenCategory
