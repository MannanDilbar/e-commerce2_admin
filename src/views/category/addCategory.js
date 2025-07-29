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
    CCardHeader,
} from '@coreui/react'
import { COLORS } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import avatar from '../../assets/images/avatars/0.png'
const AddCategory = () => {
    const usernameRef = useRef();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameMsg, setNameMsg] = useState('');

    const [image, setImage] = useState('');
    const [validImage, setValidImage] = useState(false);
    const [imageMsg, setImageMsg] = useState('Please Add Image');


    useEffect(() => { usernameRef.current.focus(); }, []);
    useEffect(() => {
        setValidName(true);


        if (name.length < 2) setValidName(false);
    }, [name]);


    const submit = async () => {
        if (!image) {
            setValidImage("true");
            return
        }
        let formData = getFormData();
        try {
            await axios.post('/api/v1/categories',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            MySwal.fire({
                title: <p> The new Category is Saved.</p>,
                timer: 1000,
                icon: 'success',
                didOpen: () => {
                },
            }).then(() => navigate('/categories'))
        } catch (err) {
            console.log(err)
        }
    }
    const getFormData = () => {

        const formData = new FormData();
        formData.append(`name`, name);
        if (image)
            formData.append(`image`, image);
        return formData;

    }
    return (
        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7}>

                    <CCard style={{ borderRadius: "5%" }}>
                        <CCardHeader className='text-center'>
                            <h3 style={{ color: colors2[1] }}>ADD New Category</h3>
                        </CCardHeader>
                        <CCol md={4} lg={2} xl={1}>
                            <CForm className='mt-1 mb-2'>

                                <input type="file" id="actual-btn" hidden

                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            let x = new File([e.target.files[0]], e.target.value);
                                            setImage(x);
                                            e.target.value = null;
                                        }
                                    }}
                                />
                                <label htmlFor="actual-btn"

                                ><img src={image ? URL.createObjectURL(image) : avatar} style={{
                                    borderRadius: "20%", width: '120px', height: '140'
                                }} /></label>
                                {validImage&&<p>{imageMsg}</p>}
                            </CForm>
                        </CCol >
                        <CCardBody >
                            <CForm>
                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        Name
                                    </CInputGroupText>
                                    <CFormInput
                                        ref={usernameRef}
                                        placeholder="Category Name"
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


export default AddCategory
