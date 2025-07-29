import React, { useState, useRef, useEffect } from 'react'
import axios from '../../axios';
import '../../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CCardHeader,CFormSelect,

} from '@coreui/react'
import { COLORS } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddSubCategory = () => {
    const usernameRef = useRef();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameMsg, setNameMsg] = useState('');
    const [categories, setCategories] = useState();
    const [categoryId, setCategoryId] = useState();

    useEffect(() => { usernameRef.current.focus(); }, []);
    useEffect(() => {
        fetchData()
        setValidName(true);
        if (name.length < 2) setValidName(false);
    }, [name]);
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/categories?enabled=true',
                {                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setCategories(response?.data) 
            console.log(response?.data)          
        } catch (err) {
            console.log(err);
        }
    }

    const submit = async () => {
        try {
            await axios.post('/api/v1/sub-categories',
                JSON.stringify({categoryId, name }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            MySwal.fire({
                title: <p> The new Sub Category is Saved.</p>,
                timer: 2000,
                icon: 'success',
                didOpen: () => {
                },
            }).then(() => navigate('/subCategories'))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7}>

                    <CCard style={{ borderRadius: "5%" }}>
                        <CCardHeader className='text-center'>
                            <h3 style={{ color: colors2[1] }}>ADD New Sub Category</h3>
                        </CCardHeader>

                        <CCardBody >
                            <CForm>
                            <CInputGroup className="mb-4">
                                                
                                                <CInputGroupText>
                                                    Category
                                                </CInputGroupText>
                                                <CFormSelect on onChange={(e) => setCategoryId(e.target.value)}>
                                                    <option hidden>Select Category</option>
                                                    {categories && categories.map((item, index) =>
                                                        <option value={item.id} key={index}>{item.name}</option>)}
                                                </CFormSelect>
                                            </CInputGroup>


                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        Name
                                    </CInputGroupText>
                                    <CFormInput
                                        ref={usernameRef}
                                        placeholder="Sub Category Name"
                                        aria-describedby="basic-addon2"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validName || !name ? 'valid' : 'err'}>{nameMsg}</p>



                                <div className="d-grid mt-5">
                                    <CButton onClick={submit} style={{
                                        background: "#8fd14f", color: "black"
                                        , borderColor: "black"
                                    }}
                                        disabled={!validName}
                                    >Save</CButton>
                                </div>
                            </CForm>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        </CContainer>

    )
}


export default AddSubCategory
