import useSWR from 'swr'
import styles from '../../../../styles/slideCategory.module.scss'
import courseService from '../../../services/courseService'
import SlideComponent from '@/components/common/slideComponent'

const FavoriteCategory = function () {
    const {data, error} = useSWR('/favorites', courseService.getFavCourse)

    if(error) return error
    if(!data) return (<><p>Loading...</p></>)

     return (

        <>
        <p className={styles.titleCategory}>MINHA LISTA</p>
        {data.data.courses.lenght >= 1 ? (
            <SlideComponent course={data.data.courses}/>
        ) : (
            <p className='text-center pt-3 h5'><strong>Você não possui nenhum curso favorito</strong></p>
        )}

        </>
     )
}

export default FavoriteCategory