import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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

} from '@coreui/react'
import { cilPen, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import {  COLORS,getEnabled } from '../../consts';
import { string } from 'prop-types';
const Shipping = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [shipping, setShipping] = useState();

   
    const [COLORS1] = useState(COLORS);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/shipping',
                {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setShipping(response?.data) 
            console.log(response?.data)          
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
                            <CButton color={COLORS1[3]} style={{ borderRadius: "50%" }}
                                onClick={(e) => navigate('/addShipping')}
                            >
                                <CIcon icon={cilPlus} />

                            </CButton>
                        </CCardHeader>
                    </CCard>
                </CCol>

                

                <CCol xs={12}>
                    <CCard className="mb-4 text-center">
                        <CCardHeader>
                            <h3 style={{ color: COLORS1[0] }}>Shipping</h3>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>                                        
                                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {shipping

                                        ? shipping.map((item, index) =>
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{item.address}</CTableDataCell>
                                                <CTableDataCell>{item.price}</CTableDataCell>
                                                <CTableDataCell>{getEnabled(item.enabled)}</CTableDataCell>
                                                <CTableDataCell scope="col"><CButton color=''
                                                    onClick={(e) => navigate('/updateShipping', { state: { id: item.id} })}
                                                > <CIcon className="text-warning" icon={cilPen} /></CButton></CTableDataCell>
                                                {/* <CTableDataCell scope="col"><CButton color=''><CIcon className="text-danger" icon={cilTrash} /></CButton></CTableDataCell> */}
                                            </CTableRow>) : <></>}
                                </CTableBody>
                            </CTable>

                        </CCardBody>
                    </CCard>
                </CCol>

            </CRow>
            
        </>
    )
}

export default Shipping
