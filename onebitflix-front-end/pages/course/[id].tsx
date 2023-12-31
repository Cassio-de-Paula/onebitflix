import styles from '../../styles/coursePage.module.scss'
import Head from 'next/head'
import HeaderAuth from '@/components/common/headerAuth'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import courseService, { CourseType } from '@/services/courseService'
import { Button, Container } from 'reactstrap'
import PageSpinner from '@/components/common/spinner'
import EpisodeList from '@/components/common/episodeList'
import Footer from '@/components/common/footer'

const CoursePage = function () {
    const [course, setCourse] = useState<CourseType>()
    const [loading, setLoading] = useState(true)
    const [liked , setLiked] = useState(false)
    const [favorited , setFavorited] = useState(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if(!sessionStorage.getItem('onebitflix-token')) {
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [])

    const getCourse = async function () {

        if(typeof id !== 'string') return

        const res = await courseService.getEpisodes(id)
        
        if(res.status === 200) {
            setCourse(res.data)
            setLiked(res.data.liked)
            setFavorited(res.data.favorited)
        }
    }

    useEffect(() => {
        getCourse()
    }, [id])

    const handleLikeCourse = async () => {

        if(typeof id !== 'string') return

        if(liked === true) {
            await courseService.removeLike(id)
            setLiked(false)
        } else {
            await  courseService.Like(id)
            setLiked(true)
        }
    }

    const handleFavCourse = async () => {
        if(typeof id !== 'string') return

        if(favorited === true) {
            await courseService.removeFav(id)
            setFavorited(false)
        } else {
            await courseService.addToFav(id)
            setFavorited(true)
        }
    }

    if (course === undefined) {
        return <PageSpinner/>
    }

    if(loading) {
        return <PageSpinner/>
    }


    return (

        <>
        <Head>
            <title>OnebitFlix - {course?.name}</title>
            <link rel='shorcut icon' href='/favicon.svg' type='image/x-icon'/>
        </Head>
        <main>
            <div style={{
                backgroundImage: `linear-gradient(to bottom #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: "550px",
            }}>
            <HeaderAuth />
            </div>
            <Container className={styles.courseInfo}>
                <p className={styles.courseTitle}>{course?.name}</p>
                <p className={styles.courseDescription}>{course?.synopsis}</p>
                <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false }>
                    ASSITIR AGORA!
                    <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg}/>
                </Button>
                <div className={styles.interactions}>
                    {liked === false ? (
                        <img src="/course/iconLike.svg" alt="likeImage" className={styles.interactionImages} onClick={handleLikeCourse}
                        />
                    ): (
                        <img src="/course/iconLiked.svg" alt="likeImage" className={styles.interactionImages} onClick={handleLikeCourse}
                    />
                    )}

                    {favorited === false ? (
                        <img src="/course/iconAddFav.svg" alt="likeImage" className={styles.interactionImages} onClick={handleFavCourse}
                        />
                    ): (
                        <img src="/course/iconFavorited.svg" alt="likeImage" className={styles.interactionImages} onClick={handleFavCourse}
                    />
                    )}
                </div>
            </Container>
            <Container className={styles.episodeInfo}>
                <p className={styles.episodeDivision}>EPISÓDIOS</p>
                <p className={styles.episodeLength}>
                    {course?.episodes?.length} episódios
                </p>
               {course?.episodes?.length === 0 ? (
                <p>
                    <strong>Este curso ainda não possui episódios disponíveis! &#x1F606; &#x1F918;</strong>
                </p>
               ) : (
                course?.episodes?.map((episode) => (
                    <>
                    <EpisodeList episode={episode} key={episode.id} course={course}/>
                    </>
                ))
               )}
            </Container>
            <Footer/>
        </main>
        </>
    )
}

export default CoursePage