import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'

const PasswordForm = function () {
    return (

        <>
        <Form className={styles.form}>
            <div className={styles.inputNormalDiv}>
                <FormGroup>
                    <Label for='currentPassword' className={styles.label}>SENHA ATUAL</Label>
                    <Input name='currentPassword' type='password' id='currentPassword' placeholder='********' required className={styles.input}/>
                </FormGroup>
            </div>
            <div className={styles.inputFlexDiv}>
                <FormGroup>
                    <Label for='newPassord'className={styles.label}>NOVA SENHA</Label>
                    <Input name='newPassword' type='password' id='newPassword' placeholder='********' required className={styles.inputFlex}/>
                </FormGroup>
                <FormGroup>
                    <Label for='confirmNewPassword' className={styles.label}>NOVA SENHA</Label>
                    <Input name='confirmNewPassword' type='password' id='confirmNewPassword' placeholder='********' required className={styles.inputFlex}/>
                </FormGroup>
                </div>
                <Button className={styles.formBtn} type='submit' outline>Salvar Alterações</Button>
        </Form>
        </>
    )
}

export default PasswordForm