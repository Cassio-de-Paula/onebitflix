import { CategoryType, categoriesService } from "../../../services/categoriesServices"
import useSWR from "swr"
import styles from '../../../../styles/slideCategory.module.scss'
import ListCategoriesSlide from "../listCategoriesSlide"
import PageSpinner from "@/components/common/spinner"


const ListCategories = function () {
    const {data, error} = useSWR('/categories', categoriesService.getCategories)

    if(error) return error
    if(!data) {
        return <PageSpinner/>
    } 
    
    return (
        <>
        {data.data.categories?.map((category: CategoryType) =>(
            <div className={styles.slideContainer}>
                <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name}/>
            </div>
        ))}
        </>
    )
}

export default ListCategories