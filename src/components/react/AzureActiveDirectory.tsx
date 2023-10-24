import React, { useEffect, useState } from 'react'
import { AccountInfo, PopupRequest, PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: import.meta.env.AZURE_CLIENT_ID,
        'authority': `https://login.microsoftonline.com/${import.meta.env.AZURE_TENANT_ID}`
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