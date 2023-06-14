import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import profileService from '@/services/profileService'
import ToastComponent from '@/components/common/toast'
import { useRouter } from 'next/router'

const UserForm = function () {
    const router = useRouter()

    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [intialEmail, setInitialEmail] = useState(email)
    const [createdAt, setCreatedAt] = useState('')
    const date = new Date(createdAt)
    const month =  date.toLocaleString('default', {month: 'long'})

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName)
            setLastname(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setInitialEmail(user.email)
            setCreatedAt(user.createdAt)
        })
    }, [])

    const  handleUserUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const res = await profileService.UserUpdate({
            firstName, lastName, phone, email, createdAt
        })

        if (res === 200) {
            setToastIsOpen(true)
            setErrorMessage('Informações alteradas com sucesso')
            setColor('bg-success')
            setTimeout(() => setToastIsOpen(false), 1000 * 3)

            if(email !== intialEmail) {
                router.push('/home')
                sessionStorage.clear()
            }
        } else {
            setToastIsOpen(true)
            setErrorMessage('Você não pode mudar para este email')
            setColor('bg-danger')
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
        }
    }

    return (
        <>
        <Form className={styles.form} onSubmit={handleUserUpdate}>
            <div className={styles.formName}>
                <p className={styles.nameAbbreviation}>{firstName.slice(0, 1)}{lastName.slice(0,1)}</p>
                <p className={styles.UserName}>{firstName} {lastName}</p>
            </div>
            <div className={styles.memberTime}>
                <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg}/>
                <p className={styles.memberTimeText}>Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
            </div>
            <hr />
           <div className={styles.inputFlexDiv}>
           <FormGroup>
                <Label for='firstName' className={styles.label}>NOME</Label>
                <Input name='firstName' type='text' id='firstName' placeholder='Qual o seu primeiro nome?' required className={styles.inputFlex} value={firstName} onChange={(event) => {setFirstName(event.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label for='lastName' className={styles.label}>SOBRENOME</Label>
                <Input name='lastName' type='text' id='lastName' placeholder='Qual o seu último nome?' required className={styles.inputFlex} value={lastName} onChange={(event) => {setLastname(event.target.value)}}/>
            </FormGroup>
           </div>
           <div className={styles.inputNormalDiv}>
           <FormGroup>
                <Label foor='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
                <Input name='phone' type='tel' id='phone' placeholder='(xx) 9xxxx-xxxx' required className={styles.input} value={phone} onChange={(event) => {setPhone(event.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label for='email' className={styles.label}>E-MAIL</Label>
                <Input name='email' type='email' id='email' placeholder='Insira seu email' required className={styles.input} value={email} onChange={(event) => {setEmail(event.target.value)}}/>
            </FormGroup>

            <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
           </div>
        </Form>
        <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
        </>
    )
}

export default  UserForm