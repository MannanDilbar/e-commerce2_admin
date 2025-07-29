import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/login.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CImage
  
} from '@coreui/react'
import { cilPen, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../../hooks/useAuth";
import axios from '../../../axios';

import {  COLORS, BASE_Image_URL,getEnabled } from '../../../consts';
const Admins = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS);  
 
  const [admins, setAdmins] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/admins',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setAdmins(response?.data)
    } catch (err) {
      console.log(err);

    }

  }

  return (
    <>
     

      <CRow>
        <CCol md={4}>
          <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
            <CCardHeader>
              <CButton color={colors2[3]} style={{ borderRadius: "50%" }}
                onClick={(e) => navigate('/addAdmin')}
              >
                <CIcon icon={cilPlus} />

              </CButton>
            </CCardHeader>
          </CCard>

        </CCol>
       
        {admins
          ? <>
            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Admins</h3>
                </CCardHeader>
                <CCardBody>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">FirstName</CTableHeaderCell>
                        <CTableHeaderCell scope="col">LastName</CTableHeaderCell>
                        <CTableHeaderCell scope="col">UserName</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {admins && admins.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.user.firstname}</CTableDataCell>
                          <CTableDataCell>{item.user.lastname}</CTableDataCell>
                          <CTableDataCell>{item.user.email}</CTableDataCell>
                          <CTableDataCell> {getEnabled(item.user.enabled)}</CTableDataCell>
                          <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.user.imageUrl}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                         
                          <CTableDataCell scope="col"><CButton color=''
                            onClick={(e) => navigate('/updateAdmin', { state: { id: item.id } })}
                          > <CIcon className="text-warning" icon={cilPen} /></CButton></CTableDataCell>

                        </CTableRow>)}
                    </CTableBody>
                  </CTable>

                </CCardBody>
              </CCard>
            </CCol></> : <>
            <CRow>
              <CCol md={6}>
                <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
                  <CCardHeader>
                    <h3 style={{ color: 'red' }} >
                      Oops.. Sorry There is no data.
                    </h3>
                  </CCardHeader>
                </CCard>

              </CCol>
            </CRow>
          </>}

      </CRow>
      
    </>
  )
}

export default Admins
