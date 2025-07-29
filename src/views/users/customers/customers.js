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
  CImage,CInputGroup,
  CFormCheck,CInputGroupText,
  CFormInput

  
} from '@coreui/react'
import { cilPen, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../../hooks/useAuth";
import axios from '../../../axios';
import Swal from 'sweetalert2'
import 'animate.css';
import withReactContent from 'sweetalert2-react-content'
import {  COLORS, BASE_Image_URL,getEnabled } from '../../../consts';
import { string } from 'prop-types';
const Customers = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS);  
  const MySwal = withReactContent(Swal)
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetchData();
    searchData();
  }, []);
  
  useEffect(() => {   
    searchData();
  }, [search]);
  

  const changeEnabled = async (enabled,id,username) => {
    let x='Disable'
    if(enabled) x='Enable'
    
    Swal.fire({
      title: "Are you sure?",
      text: "You Want "+x+" "+username+"!",
      icon: "warning",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
        `
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, "+x+"!"
    }).then((result) => {
      if (result.isConfirmed) 
        ChangeCustomerEnabled(id,enabled)
});
  }
const ChangeCustomerEnabled= async (id,enabled)=>{
  
try {
  const response = await axios.patch('/api/v1/customers/'+id+'?enabled='+enabled,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth?.accessToken
      }
    }
  )
  if(response.status===200){ 
    setAllCustomers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, user: { ...c.user, enabled: enabled } }: c
      )
    );
  setCustomers(prev =>
    prev.map(c =>
      c.id === id ? { ...c, user: { ...c.user, enabled: enabled } } : c
    )
  );
  }
  console.log(response)  
} catch (err) {
  console.log(err);
}




}




  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/customers',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)      
      setAllCustomers(response?.data)
      setCustomers(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const searchData =  () => {
    const filtered = allCustomers.filter(p => {
      return(        
        (search.trim()==='' ||p.user.email.toLowerCase().includes(search.toLowerCase()))        
      )
       
    });
    setCustomers(filtered);
  }
  return (
    <>    
      <CRow>
        {customers
          ? <>
            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Customers</h3>
                </CCardHeader>
                <CCardBody>
                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                       Search
                                    </CInputGroupText>
                                    <CFormInput
                                        value={search}
                                        placeholder="Search"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </CInputGroup>
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


                      {customers && customers.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.user.firstname}</CTableDataCell>
                          <CTableDataCell>{item.user.lastname}</CTableDataCell>
                          <CTableDataCell>{item.user.email}</CTableDataCell>
                          <CTableDataCell> 
                          <CInputGroup className="mb-4">
                                    <CFormCheck id="flexCheckDefault"
                                        checked={item?.user.enabled}
                                        onChange={((e) => changeEnabled(e.target.checked,item.id,item.user.email))} label="Enabled" />
                                </CInputGroup>
                            </CTableDataCell>
                          <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.user.imageUrl}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                         
                          
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

export default Customers
