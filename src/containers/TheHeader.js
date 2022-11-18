import React from 'react'
import {
  CHeader,
  CImg,
  CSubheader,
  CRow,
  CContainer,
  CCol,
  CButton
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

const TheHeader = () => {
  const history = useHistory();
  const isLogged = localStorage.getItem('token')?.length;

  const handlerLogout = () => {
    history.push('/logout');
  }

  return (
    <CHeader withSubheader>
      <CSubheader className="px-3">
        <CContainer fluid>
          <CRow>  
            <CCol sm={4}>
            <div>
              
            </div>
            </CCol>
            <CCol sm={4}>
            <div className="text-center">
              <CImg src="./sesc-logo.png" className="mt-2 mb-2"/>
            </div>
            </CCol>
            <CCol sm={4} className="d-flex justify-content-end align-items-center">
              <div >
                {
                  isLogged &&
                  <CButton color='danger' variant="outline" size='lg' onClick={handlerLogout}>
                    <CIcon name="cil-drop" />Sair
                  </CButton>
                }
                
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </CSubheader>
      
    </CHeader>
  )
}

export default TheHeader
