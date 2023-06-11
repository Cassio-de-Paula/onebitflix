import HeaderGeneric from '@/components/common/headerGeneric'
import styles from '../styles/resgisterLogin.module.scss'
import Head from 'next/head'
import { Form, FormGroup, Label, Container, Input, Button} from 'reactstrap'
import Footer from '../src/components/common/footer'

const Register = function () {
    return (

        <>
        <Head>
            <title>Onebitflix - Registro</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            <script src="https://jsuites.net/v4/jsuites.js"></script>
        </Head>
        <main className={styles.main}>
            <HeaderGeneric logoUrl='/' btnUrl='/logion' btnContent='Quero fazer login'/>
        <Container className='py-5'>
            <p className={styles.formTitle}><strong>Bem Vindo(a) ao Onebitflix!</strong></p>
            <Form className={styles.form}>
                <p className='text-center'><strong>Faça sua conta!</strong></p>
                <FormGroup>
                    <Label for='firstName' className={styles.label}>NOME</Label>
                    <Input id='firstName' name='firstName' type='text' placeholder='Qual o seu nome?' required maxLength={20} className={styles.inputName}/>
                </FormGroup>
                <FormGroup>
                    <Label for='lastName' className={styles.label}>SOBRENOME</Label>
                    <Input id='lastName' name='lastName' type='text' placeholder='Qual o seu sobrenome?' required maxLength={20} className={styles.inputName}/>
                </FormGroup>
                <FormGroup>
                    <Label for='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
                    <Input id='phone' name='phone' type='tel' placeholder='(xx) 9xxxx-xxxx' data-mask='[-]+55 (00) 00000-0000' required className={styles.input}/>
                </FormGroup>
                <FormGroup>
                    <Label for='email' className={styles.label}>EMAIL</Label>
                    <Input id='email' name='email' type='email' placeholder='Digite o seu email' required className={styles.input}/>
                </FormGroup>
                <FormGroup>
                    <Label for='birth' className={styles.label}>DATA DE NASCIMENTO</Label>
                    <Input id='birth' name='birth' type='date' placeholder='Qual o seu nome?' min='1930-01-01' max='2022-12-31' required className={styles.input}/>
                </FormGroup>
                <FormGroup>
                    <Label for='password' className={styles.label}>SENHA</Label>
                    <Input id='password' name='password' type='password' placeholder='Digite o sua senha' required className={styles.input}/>
                </FormGroup>
                <FormGroup>
                    <Label for='password' className={styles.label}>CONFIRME SUA SENHA</Label>
                    <Input id='password' name='password' type='password' placeholder='Confirme a sua senha' required className={styles.input}/>
                </FormGroup>
                <Button type='submit' outline className={styles.formBtn}>
                    CADASTRAR
                </Button>
            </Form>
        </Container>
        <Footer></Footer>

        </main>
        </>
    )
}

export default Register