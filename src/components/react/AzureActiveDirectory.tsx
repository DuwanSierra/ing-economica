import React, { useEffect, useState } from 'react'
import { AccountInfo, PopupRequest, PublicClientApplication } from "@azure/msal-browser";

const AzureAD = {
    CLIENT_ID: import.meta.env.VITE_AZURE_CLIENT_ID,
    TENANT_ID: import.meta.env.VITE_AZURE_TENANT_ID
};

const AzureActiveDirectory:React.FC = () => {

    const msalConfig = {
        auth: {
            clientId: `${AzureAD.CLIENT_ID}`,
            'authority': `https://login.microsoftonline.com/${AzureAD.TENANT_ID}`
        }
    };

    console.log(msalConfig);
    console.log(AzureAD);

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