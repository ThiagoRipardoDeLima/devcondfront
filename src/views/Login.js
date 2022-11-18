import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useApi from '../services/api'
import { TheHeader } from '../containers/index'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const api = useApi();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [msgAlert, setMsg] = useState('');
  const [loading, setLoading] = useState(false);


  const handlerLoginButton = async () => {
    setLoading(true);
    if(!(email && password))
    {
      exibirMsg('Informe email e senha para prosseguir!');
      return;
    }
    
    const result = await api.login(email, password);

    if(result?.error === '')
    {
      localStorage.setItem('token', result?.token);
      history.push("/");
    }

    exibirMsg(result?.error ?? 'Sistema indiponível no momento! Tente mais tarde.' );
    
  }

  const exibirMsg = (msg) => {
    setMsg(msg);
    setTimeout(()=>{ setMsg('') }, 5000);
    setLoading(false);
  }

  return (
    <div className="c-app c-default-layout">
      <TheHeader />
      <CContainer className="d-flex align-items-center">

        <CRow className="justify-content-center">
        
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Sou Cliente Sesc</h2>
                    <p className="text-muted">Informe seus dados de acesso</p>

                    { msgAlert !== '' && 
                      <CAlert color={'danger'} fade={true} className="text-center"> {msgAlert}</CAlert>
                    }

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="E-mail" value={email} onChange={ e=>setEmail(e.target.value) } disabled={loading} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Senha" value={password} onChange={ e => {setPassword(e.target.value) } } disabled={loading} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handlerLoginButton} disabled={loading}>
                          <>
                            {loading && <CSpinner component="span" size="sm" aria-hidden="true"/> }
                            {loading ? ' Carregando...' : 'Acessar' }
                          </>
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Esqueceu a senha?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Carteirinha SESC</h2>
                    <p>Os trabalhadores que atuam com carteira assinada no ramo do comércio de bens, serviços e turismo, ou aposentado pelo ramo e seus dependentes, têm o direito aos benefícios oferecidos pela Instituição.</p>
                    <Link to="/login">
                      <CButton color="info" className="mt-3" active tabIndex={-1}>Solicitar!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}

export default Login
