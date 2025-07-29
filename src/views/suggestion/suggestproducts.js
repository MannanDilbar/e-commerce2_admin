import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
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
  CImage,
  CFormSelect,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription } from '@coreui/icons';
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import {  COLORS, BASE_Image_URL } from '../../consts';
const SuggestProducts = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchData();   
  }, []); 
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/suggest-items',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setProducts(response?.data)
    } catch (err) {
      console.log(err);

    }

  }
  const changeStatus=(newStatus)=>{
    console.log(newStatus)
  }

  return (
    <>
     
      <CRow>
        
        {products
          ? <>

            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Suggestion Products</h3>
                </CCardHeader>
                <CCardBody>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>                        
                        <CTableHeaderCell scope="col">image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vendor</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {products && products.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.title}</CTableDataCell>                         
                          <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.images[0]}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                          <CTableDataCell><label style={{ marginRight: '10px' }}>{item.vendor}</label></CTableDataCell>

                          <CTableDataCell scope="col">  
                                                <CFormSelect  on onChange={(e) => changeStatus(e.target.value)}>
                                                    <option value='NEW' selected>NEW</option>
                                                    <option value='APPROVED' >APPROVED</option>
                                                    <option value='REJECTED' >REJECTED</option>
                                                </CFormSelect></CTableDataCell>

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

export default SuggestProducts
