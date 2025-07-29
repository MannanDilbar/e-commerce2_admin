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
    CFormCheck,
    CCardHeader,CFormSelect
} from '@coreui/react'

import { useLocation } from 'react-router-dom';
import {  COLORS, formatDate } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


  
const UpdateSubCategory = () => {
    const location = useLocation();
    const MySwal = withReactContent(Swal)
    const usernameRef = useRef();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [id, setId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameMsg, setNameMsg] = useState('');
    const [categories, setCategories] = useState();
    const [categoryId, setCategoryId] = useState();
   

    const [COLORS2] = useState(COLORS);
    useEffect(() => {
        fetchCategories();
        fetchData();
         }, []);
         useEffect(() => {
            console.log(enabled)
             }, [enabled]);
             const fetchCategories = async () => {
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
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/sub-categories/' + location.state.id,
                {                   
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            console.log(response?.data)
            setId(response?.data.id);
            setName(response?.data.name);
            setCategoryId(response?.data.category.id);
            setEnabled(response?.data.enabled);
            setCreatedDate(formatDate(response?.data.createdDate));


            usernameRef.current.focus();
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setValidName(true);        
        if (name.length < 3) {
            setNameMsg('Name Must Be 3 chars or more !');
            setValidName(false);
        }
    }, [name]);

   
   

    const submit = async () => {
        try {
            await axios.put('/api/v1/sub-categories',
                JSON.stringify({ id,name, enabled,categoryId}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            MySwal.fire({
                title: <p>Update Sub Category is Successed.</p>,
                timer: 3000,
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
                                <h3 style={{ color: COLORS2[2] }}>Update Sub Category</h3>
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
                                                        <option value={item.id} selected={item.id===categoryId} key={index}>{item.name}</option>)}
                                                </CFormSelect>
                                            </CInputGroup>




                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                           Name
                                        </CInputGroupText>
                                        <CFormInput
                                            ref={usernameRef}
                                            placeholder="Country Name"
                                            aria-describedby="basic-addon2"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            
                                        />

                                    </CInputGroup>
                                    <p className={validName || !name ? 'valid' : 'err'}>{nameMsg}</p>
                                    
                                    <CInputGroup className="mb-4">                                        
                                        <CFormCheck id="flexCheckDefault"
                                         checked={enabled}
                                          onChange={((e)=>setEnabled(e.target.checked))} label="Enabled"/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                           Created Date
                                        </CInputGroupText>
                                        <CFormInput                                            
                                             value={createdDate}
                                           disabled
                                        />
                                    </CInputGroup>

                                    <div className="d-grid mt-5">
                                        <CButton onClick={submit} style={{
                                            background: "#8fd14f", color: "black"
                                            , borderColor: "black"
                                        }}
                                            disabled={!validName }
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


export default UpdateSubCategory
