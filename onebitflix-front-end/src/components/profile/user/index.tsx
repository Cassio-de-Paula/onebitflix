import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'

const UserForm = function () {
    return (
        <>
        <Form className={styles.form}>
            <div className={styles.formName}>
                <p className={styles.nameAbbreviation}>NT</p>
                <p className={styles.UserName}>NAME TEST</p>
            </div>
            <div className={styles.memberTime}>
                <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg}/>
                <p className={styles.memberTimeText}>Membro desde <br /> 20 de  Abril de 2020</p>
            </div>
            <hr />
           <div className={styles.inputFlexDiv}>
           <FormGroup>
                <Label for='firstName' className={styles.label}>NOME</Label>
                <Input name='firstName' type='text' id='firstName' placeholder='Qual o seu primeiro nome?' required className={styles.inputFlex} value={"Name"}/>
            </FormGroup>
            <FormGroup>
                <Label for='lastName' className={styles.label}>SOBRENOME</Label>
                <Input name='lastName' type='text' id='lastName' placeholder='Qual o seu último nome?' required className={styles.inputFlex} value={"Test"}/>
            </FormGroup>
           </div>
           <div className={styles.inputNormalDiv}>
           <FormGroup>
                <Label foor='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
                <Input name='phone' type='tel' id='phone' placeholder='(xx) 9xxxx-xxxx' required className={styles.input} value={"+55 (21) 99999-9999"}/>
            </FormGroup>
            <FormGroup>
                <Label for='email' className={styles.label}>E-MAIL</Label>
                <Input name='email' type='email' id='email' placeholder='Insira seu email' required className={styles.input} value={"testemail@gmail.com"}/>
            </FormGroup>

            <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
           </div>
        </Form>
        </>
    )
}

export default  UserForm