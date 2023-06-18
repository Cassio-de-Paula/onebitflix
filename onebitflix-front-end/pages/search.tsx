import Head from 'next/head'
import styles from '../styles/search.module.scss'
import HeaderAuth from '@/components/common/headerAuth'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import courseService, { CourseType } from '@/services/courseService'
import { Container } from 'reactstrap'
import SearchCard from '@/components/searchCard'
import Footer from '@/components/common/footer'

const Search = function () {
    const router = useRouter()
    const searchName = router.query.name
    const [searchResult, setSearchResult] = useState<CourseType[]>([])


    const searchCourses = async function () {
        if (typeof searchName == 'string') {
            const res = await courseService.getSearch(searchName)
            setSearchResult(res.data.courses)
            console.log(searchResult)
        }
    }

    useEffect(() => {
        console.log(searchName)
        searchCourses()
    }, [searchName])

    return (

        <>
        <Head>
            <title>Onebitflix - {searchName}</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>
        <main className={styles.main}>
            <div className={styles.header}>
                <HeaderAuth/>
            </div>
            <section className={styles.searchContainer}>
                {searchResult.length >= 1 ? (
                     <Container className='d-flex flex-wrap justify-content-center gap-5 py-4'>
                     {searchResult?.map((course) => (
                        <SearchCard key={course.id} course={course}/>
                     ))}
                    </Container>
                 ) : (
                    <div className={styles.searchContainer}>
                        <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
                    </div>
                 )}
            </section>
            
            <div className={styles.footer}>
                 <Footer />
            </div>
        </main>
        </>
    )
}

export default Search