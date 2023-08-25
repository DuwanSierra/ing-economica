import React, { useEffect, useState } from 'react'
import { AccountInfo, PopupRequest, PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: 'clientcode',
        'authority': 'https://login.microsoftonline.com/{tenant_id}'
    }
};

const AzureActiveDirectory:React.FC = () => {
    const [userInfo, setUserInfo] = useState<AccountInfo>();
    const initAD = async () => {
        const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);
        if(!userInfo){
            const account = (await msalInstance.loginPopup()).account;
            setUserInfo(account);
            alert(`Bievenido - ${account?.name}`);
        }
    };

  return (
    <div className='basis-2/4'>
        {
            userInfo && <span>{userInfo?.name}</span>
        }
        {
            !userInfo && <button onClick={initAD}>Iniciar Sesión UD</button>
        }
    </div>
  )
}

export default AzureActiveDirectory