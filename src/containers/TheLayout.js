import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'
import useApi from '../services/api';

const TheLayout = () => {
    const api = useApi();
    const history = useHistory();

    const[loading, setLoading] = useState(false);

    useEffect(()=>{
        const checkLogin = async () => {
            if(!api.getToken())
                history.push('/login');

            const result = await api.validateToken();
            if(result.error !== '')
            {
                alert(result.error);
                history.push('/logout');
            }

            setLoading(false);
        }

        checkLogin();
    });

    return (
        
        <div className="c-app c-default-layout">
            <TheHeader />
            { !loading &&
                <>
                    {/* <TheSidebar/> */}
                    <div className="c-wrapper">
                        <div className="c-body" style={{ paddingTop: 50 }}>
                            <TheContent/>
                        </div>
                        <TheFooter/>
                    </div>
                </>
            }
        </div>
    )
}

export default TheLayout
