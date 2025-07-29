import React, { useState, useEffect } from 'react'
import  {  useSearchParams } from 'react-router-dom'
import axios from '../../axios';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
const VerifyEmail = () => {
  const [msg, setMsg] = useState('Sorry somthing went wrong.');
  const [searchParams, setSearchParams] = useSearchParams();
 const code= searchParams.get("code");
  useEffect(() => {
    submit();
   }, []);
  
  const submit = async () => {   
    try {
      const response = await axios.post('/api/v1/app/verify-email/'+code);     
      setMsg(response?.data);      
     
    } catch (err) {
      
      setMsg(err.message);
    }
  }

  return (

    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        
        <CRow className="justify-content-center">
          <CCol md={8} lg={7} xl={5}>
            <CCardGroup>
              <CCard className="p-4" style={{ borderRadius: "15%" }}>
                <CCardBody>
                 <h4>{msg}</h4>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      
      </CContainer>
    </div>
  )
}

export default VerifyEmail
