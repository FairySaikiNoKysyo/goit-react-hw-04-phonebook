import { Formik, Field, Form,} from 'formik';

import * as Yup from 'yup';
import { StyledErrMessage } from './FormStyled';
const SignupSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[a-zA-Zа-яА-Я]+(([ ' -][a-zA-Zа-яА-Я ])?[a-zA-ЯА-Я]*)*$/, 'The name format is incorrect!') 
  .required('Required'),
   
  number: Yup.string()
  .matches(/\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,'The phone number format is incorrect!') 
  .required('Required'),
});

export const ContactsForm = ({ submit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values,actions)=> {
        submit(values);
        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor="name">Add Contact</label>
        <Field type="text" name="name" placeholder="Anton" />
        <StyledErrMessage name="name" component="span"/>
        <label htmlFor="number">Add Contact</label>
        <Field type="tel" name="number" placeholder="" />
        <StyledErrMessage name="number" component="span"/>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
