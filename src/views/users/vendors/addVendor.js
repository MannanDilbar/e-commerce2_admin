import React, { useState, useEffect } from 'react'
import axios from '../../../axios';
import '../../../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
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
    CSpinner

} from '@coreui/react'
import avatar from '../../../assets/images/avatars/0.png'
import { COLORS } from '../../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddVendor = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);


    const [image, setImage] = useState(null);
    const [validImage, setValidImage] = useState(0);
    const [msgImage, setMsgImage] = useState('Select User Image');

    const [logo, setLogo] = useState(null);
    const [validLogo, setValidLogo] = useState(0);
    const [msgLogo, setMsgLogo] = useState('Select Logo Image');

    const [spinner, setSpinner] = useState(false);

    const [shopname, setShopname] = useState('');
    const [validShopname, setValidShopname] = useState(0);
    const [msgShopname, setMsgShopname] = useState('Please Enter Valid Shop name');


    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(0);
    const [msgFirstname, setMsgFirstname] = useState('Please Enter Valid Firstname');


    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(0);
    const [msgLastname, setMsgLastname] = useState('Please Enter Valid Lastname');


    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(0);
    const [msgAddress, setMsgAddress] = useState('Please Enter Valid Address');


    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(0);
    const [msgEmail, setMsgEmail] = useState('Please Enter Valid E-mail');


    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(0);
    const [msgPhone, setMsgPhone] = useState('Please Enter Valid Phone');

    useEffect(() => {
        setValidEmail(-1);
        const mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ((mailRegx.test(email))) setValidEmail(1);
    }, [email]);

    useEffect(() => {
        setValidShopname(-1);
        if (shopname && shopname.length >= 2)
            setValidShopname(1);
    }, [shopname]);


    useEffect(() => {
        setValidFirstname(-1);
        if (firstname && firstname.length >= 2)
            setValidFirstname(1);
    }, [firstname]);


    useEffect(() => {
        setValidLastname(-1);
        if (lastname && lastname.length >= 2)
            setValidLastname(1);
    }, [lastname]);


    useEffect(() => {
        setValidAddress(-1);
        if (address && address.length >= 2)
            setValidAddress(1);
    }, [address]);


    useEffect(() => {
        setValidPhone(-1);
        if (phone && phone.length >= 11)
            setValidPhone(1);
    }, [phone]);



    const submit = async () => {
        if (validFirstname !== 1 || validLastname !== 1
            || validAddress !== 1 || validPhone !== 1
            || validEmail !== 1) return;
if(!image){
setValidImage(-1);return}
if(!logo){
    setValidLogo(-1);return}

        setSpinner(true);
        let formData = getFormData();

        const response = await axios.post('/api/v1/vendors',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

        setSpinner(false);
        MySwal.fire({
            title: <p>The new Vendor is Saved</p>,
            timer: 2000,
            icon: 'success',
            didOpen: () => {
            },
        }).then(() => navigate(-1))


    }
    const getFormData = () => {

        const formData = new FormData();
        formData.append(`shopName`, shopname);
        formData.append(`firstname`, firstname);
        formData.append(`lastname`, lastname);

        formData.append(`address`, address);
        formData.append(`email`, email);
      
            formData.append(`image`, image);
            formData.append(`logo`, logo);
        formData.append(`phone`, phone);


        return formData;

    }


    return (

        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7} className='mb-4' style={{ borderRadius: "50%" }}>
                    <CCard >
                        <CCardBody className='text-center'>
                            <h4 style={{ color: colors2[1] }}>Add New Vendor</h4>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={11} lg={9} xl={7}></CCol>
                <CRow>
                    <CCol md={3} lg={3} xl={3}>

                    </CCol>

                    <CCol md={1} lg={1} xl={1}>
                        <CForm className='mt-1 mb-2'>

                            <input type="file" id="actual-btn1" hidden

                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        let x = new File([e.target.files[0]], e.target.value);
                                        setLogo(x);
                                        e.target.value = null;
                                    }
                                }}
                            />
                            <label htmlFor="actual-btn1" style={{ alignItems: 'center' }}

                            ><img src={logo ? URL.createObjectURL(logo) : avatar} style={{
                                borderRadius: "20%", width: '120px', height: '140'
                            }} /><span style={{ marginLeft: "20px" }}> Shop Logo</span></label>
                            <p className={validLogo !== -1 ? 'valid' : 'err'}
                                style={{ marginTop: '-5px' }}>{msgLogo}</p>
                        </CForm>
                    </CCol >
                    <CCol md={3} lg={3} xl={3}>

                    </CCol>
                    <CCol md={1} lg={1} xl={1}>
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
                            }} /> <span style={{ marginLeft: "20px" }}> User Image</span></label>
                            <p className={validImage !== -1 ? 'valid' : 'err'}
                                style={{ marginTop: '-5px' }}>{msgImage}</p>
                        </CForm>
                    </CCol >



                </CRow>

                <CCol md={11} lg={9} xl={7}>
                    <CCard style={{ borderRadius: "5%" }}>
                        <CCardBody >
                            <CForm>


                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validShopname === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        Shop Name
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Shop Name"
                                        value={shopname}
                                        autoComplete
                                        onChange={(e) => setShopname(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validShopname !== -1 ? 'valid' : 'err'}>{msgShopname}</p>

                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validFirstname === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        User Firstname
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="FirstName"
                                        value={firstname} autoComplete
                                        onChange={(e) => setFirstname(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validFirstname !== -1 ? 'valid' : 'err'}>{msgFirstname}</p>

                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validLastname === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        User Lastname
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Lastname"
                                        value={lastname} autoComplete
                                        onChange={(e) => setLastname(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validLastname !== -1 ? 'valid' : 'err'}>{msgLastname}</p>

                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validEmail === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        User E-Mail
                                    </CInputGroupText>
                                    <CFormInput
                                    type='email'
                                        placeholder="E-Mail"
                                        value={email} autoComplete
                                        onChange={(e) => setEmail(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validEmail !== -1 ? 'valid' : 'err'}>{msgEmail}</p>

                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validAddress === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        Address
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Address"
                                        value={address} autoComplete
                                        onChange={(e) => setAddress(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validAddress !== -1 ? 'valid' : 'err'}>{msgAddress}</p>

                                <CInputGroup className="mb-4">
                                    <CInputGroupText style={{
                                        background: 'none', border: 'none',
                                        marginLeft: '-25px', color: 'green'
                                    }}
                                        className={validPhone === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        Phone
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Phone"
                                        value={phone} autoComplete
                                        onChange={(e) => setPhone(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validPhone !== -1 ? 'valid' : 'err'}>{msgPhone}</p>








                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol md={11} lg={9} xl={7}>
                    <div className="d-grid mt-5">
                        <CButton style={{
                            background: "#8fd14f", color: "black"
                            , borderColor: "black"
                        }}
                            onClick={(e) => submit()}
                            disabled={spinner}
                        >
                            {/* <CSpinner hidden={!spinner} component="span" style={{marginRight:'20px'}} size="sm" aria-hidden="true" /> */}
                            <CSpinner hidden={!spinner} variant="grow" component="span" style={{ marginRight: '20px' }} size="sm" aria-hidden="true" />
                            Save</CButton>
                    </div>
                </CCol>
            </CRow>
        </CContainer>

    )
}


export default AddVendor