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
    CCardHeader, CFormSelect,

} from '@coreui/react'
import { COLORS } from '../../consts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddShipping = () => {
    const usernameRef = useRef();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);
    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressMsg, setAddressMsg] = useState('');

    const [price, setPrice] = useState(0);

    useEffect(() => { usernameRef.current.focus(); }, []);
    useEffect(() => {
        setValidAddress(true);
        if (address.length < 2) setValidAddress(false);
    }, [address]);


    const submit = async () => {
        try {
            await axios.post('/api/v1/shipping',
                JSON.stringify({ address, price }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            MySwal.fire({
                title: <p> The new Shipping is Saved.</p>,
                timer: 2000,
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
                            <h3 style={{ color: colors2[1] }}>ADD New Sub Category</h3>
                        </CCardHeader>

                        <CCardBody >
                            <CForm>
                                <CInputGroup className="mb-4">

                                    <CInputGroupText>
                                        Address
                                    </CInputGroupText>
                                    <CFormInput
                                        ref={usernameRef}
                                        placeholder="Shipping Area"
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
                                        type='number'
                                        placeholder="Price"
                                        value={price}
                                        min={0}
                                        onChange={(e) => setPrice(e.target.value)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9 .]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />

                                </CInputGroup>
                              



                                <div className="d-grid mt-5">
                                    <CButton onClick={submit} style={{
                                        background: "#8fd14f", color: "black"
                                        , borderColor: "black"
                                    }}
                                        disabled={!validAddress}
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


export default AddShipping
