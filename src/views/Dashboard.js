import React, {useState, useEffect} from 'react'
import {
  CRow,
  CCol,
  CContainer,
  CCardGroup,
  CWidgetProgressIcon,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
import navigation from '../containers/_nav'

const Dashboard = () => {

  const history = useHistory();

  const handlerDetalheCliente = (e, redirect) => {
    console.log(redirect);
    history.push(redirect.to);
  }

  let menu = navigation.map((item, index) =>
    item?.name &&
    <CCol sm={3} key={index}>    
      <CButton onClick={e => handlerDetalheCliente(e, item)} style={{ width: '100%', height: '100%' }}>
        <CWidgetProgressIcon
          header={item.name}
          color="gradient-primary"
          inverse
          value={100}
          style={{ height: 'inherit' }}
        >
          <CIcon name={item.icon} height="96"/>
        </CWidgetProgressIcon>
      </CButton>
    </CCol>
     
  );

  return (
    <>

      <CCardGroup className="mb-1 mt-20">
        <CContainer>
          <CRow className='text-center p-5'>
            <CCol sm={12}>
              
            </CCol>
          </CRow>
          <CRow>
          {/*   <CCol sm={3}>
              <CButton onClick={handlerDetalheCliente}>
                <CWidgetProgressIcon
                  header="Thiago Ripardo de Lima"
                  text="COMERCIÁRIO - Válido até 15/10/2025"
                  color="gradient-success"
                  inverse
                  value={100}
                >
                  <CIcon name="cil-people" height="96"/>
                </CWidgetProgressIcon>
              </CButton>
            </CCol>
            
            <CCol sm={3}>
              <CButton onClick={handlerDetalheCliente}>
                <CWidgetProgressIcon
                  header="Thiago Ripardo"
                  text="COMERCIÁRIO - Válido até 15/10/2025"
                  color="gradient-info"
                  inverse
                  value={100}
                >
                  <CIcon name="cil-people" height="96"/>
                </CWidgetProgressIcon>
              </CButton>
            </CCol>
            <CCol sm={3}>
              <CButton onClick={handlerDetalheCliente}>
                <CWidgetProgressIcon
                  header="Thiago Ripardo de Lima"
                  text="COMERCIÁRIO - Válido até 15/10/2025"
                  color="gradient-danger"
                  inverse
                  value={100}
                >
                  <CIcon name="cil-people" height="96"/>
                </CWidgetProgressIcon>
              </CButton>
            </CCol>
            <CCol sm={3}>
              <CButton onClick={handlerDetalheCliente}>
                <CWidgetProgressIcon
                  header="Thiago Ripardo de Lima"
                  text="COMERCIÁRIO - Válido até 15/10/2025"
                  color="gradient-danger"
                  inverse
                  value={100}
                >
                  <CIcon name="cil-people" height="96"/>
                </CWidgetProgressIcon>
              </CButton>
            </CCol> */}
          </CRow>
          <CRow className='text-center'>
            <CCol sm={12}>
              <CButton color="success" variant="outline" size='lg'>
                <CIcon name='cil-userFollow' height='36' className='mr-2'/>Adicionar Dependente
              </CButton>
            </CCol>
          </CRow>

          <CRow> { menu } </CRow>
          
        </CContainer>
          
        
          
        
        
      </CCardGroup>

    </>
  )
}

export default Dashboard
