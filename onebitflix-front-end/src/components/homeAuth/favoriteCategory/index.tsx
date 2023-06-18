import useSWR from 'swr'
import styles from '../../../../styles/slideCategory.module.scss'
import courseService from '../../../services/courseService'
import SlideComponent from '@/components/common/slideComponent'
import PageSpinner from '@/components/common/spinner'

const FavoriteCategory = function () {
    const {data, error} = useSWR('/favorites', courseService.getFavCourse)

    if(error) return error
    if(!data) {
        return <PageSpinner/>
    }
     return (

        <>
        <p className={styles.titleCategory}>MINHA LISTA</p>
            {console.log(data.data.courses)}
        {data.data.courses.length > 0 ? (
            <div className={styles.slideContainer}>
                <SlideComponent course={data.data.courses}/>
            </div>
        ) : (
            <p className='text-center pt-3 h5'><strong>Você não possui nenhum curso favorito</strong></p>
        )}

        </>
     )
}

export default FavoriteCategory