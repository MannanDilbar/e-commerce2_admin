import React, { useState,useEffect } from 'react'
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
    CSpinner,
    CFormCheck

} from '@coreui/react'
import avatar from '../../../assets/images/avatars/0.png'
import { COLORS ,formatDate,BASE_Image_URL} from '../../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import { useLocation } from 'react-router-dom';

const UpdateAdmin = () => {
    const MySwal = withReactContent(Swal)
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);


    const [image, setImage] = useState(null);  
    const [imageURL, setImageURL] = useState();  
    const [spinner, setSpinner] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [msgFirstname, setMsgFirstname] = useState('Please Enter Valid Firstname');

   
    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [msgLastname, setMsgLastname] = useState('Please Enter Valid Lastname');

   
    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [msgAddress, setMsgAddress] = useState('Please Enter Valid Address');

   
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState('Please Enter Valid E-mail');

   
    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [msgPhone, setMsgPhone] = useState('Please Enter Valid Phone');

    const [id, setId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [enabled, setEnabled] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/admins/' + location.state.id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            console.log(response?.data)
            setId(response?.data.id);
            setFirstname(response?.data.user.firstname);
            setLastname(response?.data.user.lastname);
            setEmail(response?.data.user.email);
            setAddress(response?.data.user.address);
            setPhone(response?.data.user.phone);
            setImageURL(response?.data.user.imageUrl);
            setEnabled(response?.data.user.enabled);
            setCreatedDate(formatDate(response?.data.createdDate));
        } catch (err) {
            console.log(err);
        }

    }
  
    useEffect(() => {
        setValidEmail(-1);
        const mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ((mailRegx.test(email))) setValidEmail(1);
      }, [email]);
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
       if(validFirstname!=1|| validLastname!=1
        || validAddress!=1|| validPhone!=1
        || validEmail!=1) return;
        setSpinner(true);
        let formData = getFormData();

        const response = await axios.put('/api/v1/admins',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

        setSpinner(false);
        MySwal.fire({
            title: <p>The Admin is Updated</p>,
            timer: 2000,
            icon: 'success',
            didOpen: () => {
            },
        }).then(() => navigate(-1))


    }
    const getFormData = () => {

        const formData = new FormData();
        formData.append(`id`, id);
        formData.append(`firstname`, firstname);
        formData.append(`lastname`, lastname);

        formData.append(`address`, address);
        formData.append(`email`, email);
        if(image)
        formData.append(`image`, image);
        formData.append(`phone`, phone);
        formData.append(`enabled`, enabled);


        return formData;

    }


    return (

        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7} className='mb-4' style={{ borderRadius: "50%" }}>
                    <CCard >
                        <CCardBody className='text-center'>
                            <h4 style={{ color: colors2[1] }}>Update Admin</h4>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={11} lg={9} xl={7}></CCol>
                    <CRow>
                    <CCol md={5} lg={5} xl={5}></CCol>
                    
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
                                       
                                    ><img src={image?URL.createObjectURL(image):BASE_Image_URL+imageURL} style={{
                                        borderRadius: "20%", width:'120px',height:'140'
                                    }}/></label>

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
                                        className={validFirstname === 1 ? 'visible1' : 'hidden1'}>
                                        <CIcon icon={cilCheckAlt} size="xl" />
                                    </CInputGroupText>
                                    <CInputGroupText>
                                        Firstname
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="FirstName"
                                        value={firstname}
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
                                       Lastname
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Lastname"
                                        value={lastname}
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
                                       E-Mail
                                    </CInputGroupText>
                                    <CFormInput
                                    disabled
                                        placeholder=" E-Mail"
                                        value={email}
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
                                        value={address}
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
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                       
                                    />
                                    
                                </CInputGroup>
                                <p className={validPhone !== -1 ? 'valid' : 'err'}>{msgPhone}</p>

                               

                                <CInputGroup className="mb-4">
                                    <CFormCheck id="flexCheckDefault"
                                        checked={enabled}
                                        onChange={((e) => setEnabled(e.target.checked))} label="Enabled" />
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
                            Update</CButton>
                    </div>
                </CCol>
            </CRow>
        </CContainer>

    )
}


export default UpdateAdmin