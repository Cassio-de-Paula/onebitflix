import styles from '../styles/resgisterLogin.module.scss';
import Head from 'next/head';
import HeaderGeneric from '../src/components/common/headerGeneric';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../src/components/common/footer';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import ToastComponent from '@/components/common/toast';
import authService from '@/services/authService';



const Login = function () {

    const router = useRouter()
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastColor, setToastColor] = useState('')
    const [toastMessage, setToastMessage] = useState('')

    useEffect(() => {
        if(sessionStorage.getItem('onebitflix-token'))
        router.push('/home')
    }, [])

    const registerSuccess = router.query.registered

    useEffect(() => {
        if(registerSuccess === 'true') {
            setToastColor('bg-success')
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage('Cadastro feito com sucesso!')
         }

    }, [router.query])

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')!.toString()
        const password = formData.get('password')!.toString()
        const params = { email, password }

        const { status } = await authService.login(params)

        if(status === 200) {
            router.push('/home')
        } else {
            setToastColor('bg-danger')
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage('E-mail ou senha incorretos!')
        }
    }   

    return( 
        <>
        <Head>
            <title>Onebitflix - Login</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>
        <main className={styles.main}>
            <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Quero fazer parte'/>
            <Container className='py-5'>
                <p className={styles.formTitle}>Bem-vindo(a) de volta</p>
                <Form onSubmit={handleLogin}>
                  <p className='text-center'><strong>Bem-vindo(a) ao Onebitflix!</strong></p>
                  <FormGroup>
                    <Label for='email' className={styles.label}>
                        E-MAIL
                    </Label>
                    <Input id='email' name='email' type='email' placeholder='Qual o seu e-mail?' className={styles.input}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for='password' className={styles.label}>
                        E-MAIL
                    </Label>
                    <Input id='password' name='password' type='password' placeholder='Qual a sua senha?' className={styles.input}/>
                  </FormGroup>
                  <Button outline type='submit' className={styles.formBtn}>ENTRAR</Button>
                  <Footer></Footer>
                </Form>
                <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage}/>
            </Container>
        </main>
        </>
    )
}

export default Login