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
  CPagination,
  CPaginationItem,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormSelect,
  CFormInput,
  CForm,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
  CInputGroupText,
  CInputGroup,
  CImage,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CPopover, CTooltip, CLink

} from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cilFilter, cilPen, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import {  COLORS, BASE_Image_URL,getEnabled } from '../../consts';
const Products = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [colors2] = useState(COLORS);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [visible, setVisible] = useState(false)

  const [title, setTitle] = useState('');
 
 
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subCategories, setSubCategories] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');

  useEffect(() => {
    fetchData();
    fetchCategories()
  }, []);
  useEffect(() => {    
    fetchSubCategories()
   filterData()
  }, [categoryId]);
  useEffect(() => {    
    fetchSubCategories()
    filterData()
  }, [subCategoryId,title]);
  const filterData =  () => {
    const filtered = products.filter(p => {
      return(
        (categoryId===''||p.subCategory.category.id===categoryId)&&
        (subCategoryId===''||p.subCategory.id===subCategoryId)&&
        (title===''||p.title.toLowerCase().includes(title.toLowerCase()))        
      )
       
    });

    setFilteredProducts(filtered);

  }

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/products',
        {
          params: { categoryId, subCategoryId, title },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      console.log(response?.data)
      setFilteredProducts(response?.data)
      setProducts(response?.data)
    } catch (err) {
      console.log(err);

    }

  }
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/categories?enabled=true',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setCategories(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('/api/v1/sub-categories?categoryId=' + categoryId + '&enabled=true',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setSubCategories(response?.data)
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
                onClick={(e) => navigate('/addproduct')}
              >
                <CIcon icon={cilPlus} />

              </CButton>
            </CCardHeader>
          </CCard>

        </CCol>
        <CCol md={4}>
          <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
            <CCardHeader>
              <CButton onClick={() => setVisible(true)}   color={colors2[3]}><CIcon icon={cilFilter} /></CButton>
            </CCardHeader>
          </CCard>

        </CCol>
        {filteredProducts
          ? <>

            <COffcanvas placement="start" visible={visible} onHide={() => setVisible(false)}>
              <COffcanvasHeader>
                <COffcanvasTitle>Filter</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
              </COffcanvasHeader>
              <COffcanvasBody>
                <CRow>
                  <CCol xxl={12}>
                    <CForm>
                      <CInputGroup className="mb-5">
                        <CInputGroupText>
                          Category
                        </CInputGroupText>
                        <CFormSelect
                          on onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option hidden>Select Category</option>
                           {categories&&categories.map((item, index) =>
                            <option value={item.id} key={index} >{item.name}</option>)} 
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className="mb-5">
                        <CInputGroupText>
                          Sub Category
                        </CInputGroupText>
                        <CFormSelect
                          on onChange={(e) => setSubCategoryId(e.target.value)}
                        >
                          <option hidden>Select Sub Category</option>
                           {subCategories&&subCategories.map((item, index) =>
                            <option value={item.id} key={index} >{item.name}</option>)} 
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className="mb-5 mt-5">
                        <CInputGroupText>
                          Title
                        </CInputGroupText>
                        <CFormInput
                          id="exampleFormControlInput1"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </CInputGroup>
                     

                    </CForm>



                  </CCol>
                  <CCol className='text-center'>
                    <CButton style={{ background: '#595c62', border: 'black', width: '120px' }}
                      onClick={(e) => { fetchData(0); setVisible(false) }}
                    >OK</CButton>
                  </CCol>
                </CRow>

              </COffcanvasBody>
            </COffcanvas>


            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Products</h3>
                </CCardHeader>
                <CCardBody>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sub Category</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {filteredProducts && filteredProducts.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item?.title}</CTableDataCell>
                          <CTableDataCell>{item.subCategory?.category?.name}</CTableDataCell>
                          <CTableDataCell>{item.subCategory?.name}</CTableDataCell>
                          <CTableDataCell><CImage width='150px' src={BASE_Image_URL + item.images[0]}
                            style={{ maxHeight: '50px', width: 'auto' }} /></CTableDataCell>
                          <CTableDataCell>{getEnabled(item.enabled)}</CTableDataCell>

                          <CTableDataCell scope="col"><CButton color=''
                            onClick={(e) => navigate('/updateProduct', { state: { id: item.id } })}
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

export default Products
