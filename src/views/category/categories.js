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
    CButton,CImage

} from '@coreui/react'
import { cilPen, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import {  COLORS ,getEnabled,BASE_Image_URL} from '../../consts';
const Categories = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState();

   
    const [COLORS1] = useState(COLORS);

    useEffect(() => {
        fetchData(0);
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/categories',
                {                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                }
            )
            setCategories(response?.data) 
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
                                onClick={(e) => navigate('/addCategory')}
                            >
                                <CIcon icon={cilPlus} />

                            </CButton>
                        </CCardHeader>
                    </CCard>
                </CCol>

                

                <CCol xs={12}>
                    <CCard className="mb-4 text-center">
                        <CCardHeader>
                            <h3 style={{ color: COLORS1[0] }}>Categories</h3>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {categories

                                        ? categories.map((item, index) =>
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{item.name}</CTableDataCell>
                                                <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.imageUrl}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                                                <CTableDataCell>{getEnabled(item.enabled)}</CTableDataCell>
                                                <CTableDataCell scope="col"><CButton color=''
                                                    onClick={(e) => navigate('/updateCategory', { state: { id: item.id} })}
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

export default Categories
