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
    CCardHeader, CFormSelect
} from '@coreui/react'

import { useLocation } from 'react-router-dom';
import { COLORS, formatDate } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const UpdateShipping = () => {
    const location = useLocation();
    const MySwal = withReactContent(Swal)
    const usernameRef = useRef();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [id, setId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressMsg, setAddressMsg] = useState('');

    const [price, setPrice] = useState(0);



    const [COLORS2] = useState(COLORS);
    useEffect(() => {
        fetchData();
    }, []);
   

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/shipping/' + location.state.id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            console.log(response?.data)
            setId(response?.data.id);
            setAddress(response?.data.address);
            setPrice(response?.data.price);
            setEnabled(response?.data.enabled);
            setCreatedDate(formatDate(response?.data.createdDate));


            usernameRef.current.focus();
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setValidAddress(true);
        if (address.length < 3) {
            setAddressMsg('Address Must Be 3 chars or more !');
            setValidAddress(false);
        }
    }, [address]);




    const submit = async () => {
        try {
            await axios.put('/api/v1/shipping',
                JSON.stringify({ id, address, enabled, price }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            MySwal.fire({
                title: <p>Update Shipping is Successed.</p>,
                timer: 3000,
                icon: 'success',
                didOpen: () => {
                },
            }).then(() => navigate('/shipping'))
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
                            <h3 style={{ color: COLORS2[2] }}>Update Shippng</h3>
                        </CCardHeader>

                        <CCardBody >
                            <CForm>                               



                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        Address
                                    </CInputGroupText>
                                    <CFormInput
                                        ref={usernameRef}
                                        placeholder="Address"
                                        aria-describedby="basic-addon2"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}

                                    />

                                </CInputGroup>
                                <p className={validAddress || !address ? 'valid' : 'err'}>{addressMsg}</p>
                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        Price
                                    </CInputGroupText>
                                    <CFormInput
                                        ref={usernameRef}
                                        placeholder="Price"
                                        aria-describedby="basic-addon2"
                                        type='number'
                                        min={0}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}

                                    />

                                </CInputGroup>

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

                                <div className="d-grid mt-5">
                                    <CButton onClick={submit} style={{
                                        background: COLORS2[1], color: "white"
                                        , borderColor: "black"
                                    }}
                                        disabled={!validAddress}
                                    >Update</CButton>
                                </div>
                            </CForm>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        </CContainer>

    )
}


export default UpdateShipping
