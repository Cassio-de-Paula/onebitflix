import HeaderGeneric from '@/components/common/headerGeneric'
import styles from '../styles/resgisterLogin.module.scss'
import Head from 'next/head'

const Register = function () {
    return (

        <>
        <Head>
            <title>Onebitflix - Registro</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>
        <main>
            <HeaderGeneric logoUrl='/' btnUrl='/logion' btnContent='Quero fazer login'/>
        </main>
        </>
    )
}

export default Register