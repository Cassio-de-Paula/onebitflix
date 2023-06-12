import courseService from "../../services/courseService"
import useSWR from "swr"
import SlideComponent from "../common/slideComponent"
import styles from '../../../styles/slideCategory.module.scss'

const NewestCategory = function () {
    const {data, error} = useSWR('/newest', courseService.getNewestCourses)

    if(error) return error
    if(!data) return (<><p>Loading...</p></>)

    return ( 
        <>
        <p className={styles.titleCategory}>LANÇAMENTOS</p>
        <div className={styles.slideContainer}>
        <SlideComponent course={data.data}/>
        </div>
        </>
    )
}

export default NewestCategory