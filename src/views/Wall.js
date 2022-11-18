import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useApi from '../services/api'
import { useHistory } from 'react-router-dom';

export default () => {
    const api = useApi();
    const history = useHistory();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');

    useEffect(()=>{
        getList();
    },[]);

    const getList = async () => {
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        console.log(result);
        if(result.error === ''){
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    const _goBack = () => history.push('/');

    const fields = [
        {label: 'Titulo', key: 'title'},
        {label: 'Descrição', key: 'description', _style: {width: '70%'}},
        {label: 'Publicado Em', key: 'published', _style: {width: '8%'}},
        {label: 'Ações', key: 'actions', _style:{width: '1px'}}
    ];

    const handlerCloseModal = () => {
        setShowModal(false);
    }

    const handlerEditButton = (index) => {

        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);

        setShowModal(true);
    }

    return (
        <>
        
        <CRow>
            <CCol>
                <CButton color='warning' onClick={_goBack}>
                    <CIcon name="cil-arrow-right" className='arrow-left-rotation'/>Voltar
                </CButton>
                <h2>Mural de Avisos</h2>
                
                <CCard>
                    <CCardHeader>
                        <CButton color='primary'>
                            <CIcon name="cil-check"/>Adicionar Aviso
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable 
                            items={list}
                            fields={fields}
                            loading={loading}
                            noItemsViewSlot=" "
                            hover
                            striped
                            border
                            pagination
                            page
                            scopedSlots={{
                                'actions': (item, index) => (
                                    <td>
                                        <CButtonGroup>
                                            <CButton color='info' onClick={()=>handlerEditButton(index)}>Editar</CButton>
                                            <CButton color='danger'>Excluir</CButton>
                                        </CButtonGroup>
                                    </td>
                                )
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CModal show={showModal} onClose={handlerCloseModal}>
            <CModalHeader closeButton>Editar Aviso</CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel htmlFor='modal-title'>Titulo do aviso</CLabel>
                    <CInput 
                        type="text"
                        id="modal-title"
                        placeholder='Digite o titulo do aviso'
                        value={modalTitleField}
                        onChange={ e => setModalTitleField(e.target.value) }
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor='modal-body'>Aviso</CLabel>
                    <CTextarea 
                        id="modal-body"
                        placeholder='Digite o conteudo do aviso'
                        value={modalBodyField}
                        onChange={ e => setModalBodyField(e.target.value) }
                    />
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary">Salvar</CButton>
                <CButton color="danger">Cancelar</CButton>
            </CModalFooter>
        </CModal>

        </>
    )
}


