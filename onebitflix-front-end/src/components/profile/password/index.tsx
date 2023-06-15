import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import profileService from '@/services/profileService'
import ToastComponent from '@/components/common/toast'

const PasswordForm = function () {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassord)
        })
    }, [])

    const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(newPassword != confirmNewPassword) {
            setToastIsOpen(true)
            setErrorMessage('Senha e confirmação de senha diferentes')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            return
        }

        if(currentPassword === newPassword) {
            setToastIsOpen(true)
            setErrorMessage('Senha atual não pode ser igual a antiga')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            return
        }

        const res = await profileService.passwordUpdate({
            currentPassword,
            newPassword
        })

        if (res === 204) {
            setToastIsOpen(true)
            setErrorMessage('Senha alterada com sucesso!')
            setColor('bg-success')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            return
        }

        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')


        if (res === 400) {
            setToastIsOpen(true)
            setErrorMessage('Senha atual incorreta!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            return
        }
    }



    return (

        <>
        <Form onSubmit={handlePasswordUpdate} className={styles.form}>
            <div className={styles.inputNormalDiv}>
                <FormGroup>
                    <Label for='currentPassword' className={styles.label}>SENHA ATUAL</Label>
                    <Input name='currentPassword' type='password' id='currentPassword' placeholder='********' required className={styles.input} value={currentPassword} onChange={(event) => {
                        setCurrentPassword(event.currentTarget.value)
                    }}/>
                </FormGroup>
            </div>
            <div className={styles.inputFlexDiv}>
                <FormGroup>
                    <Label for='newPassord'className={styles.label}>NOVA SENHA</Label>
                    <Input name='newPassword' type='password' id='newPassword' placeholder='********' required className={styles.inputFlex} value={newPassword} onChange={(event) => {
                        setNewPassword(event.currentTarget.value)
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for='confirmNewPassword' className={styles.label}>CONFIRMAR SENHA</Label>
                    <Input name='confirmNewPassword' type='password' id='confirmNewPassword' placeholder='********' required className={styles.inputFlex} value={confirmNewPassword} onChange={(event) => {
                        setConfirmNewPassword(event.currentTarget.value)
                    }}/>
                </FormGroup>
                </div>
                <Button className={styles.formBtn} type='submit' outline>Salvar Alterações</Button>
        </Form>
        <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
        </>
    )
}

export default PasswordForm