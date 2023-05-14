import React, { useState } from 'react'
import AnualidadFuturaComponent from './anualidad-ordinaria-futura';
import AnualidadPresenteComponent from './anualidad-ordinaria-presente';


const anualidadFuturaTab = {
    id: 'futura',
    label: 'Anualidad Futura',
};
const capitalizacionTab = {
    id: 'presente',
    label: 'Anualidad Presente',
};

const tabOptions = [
    anualidadFuturaTab,
    capitalizacionTab
];

const AnualidadComponent:React.FC = () => {

    const [selectedTab, setSelectTab] = useState(anualidadFuturaTab.id);


    const setAnotherTabDefault = (tabId: string) => {
        setSelectTab(tabId);
    };

  return (
    <>
      <div className="tabs">
        {
          tabOptions.map((tab) => (
            <button
              className={`tab tab-lg tab-lifted ${selectedTab === tab.id ? 'tab-active' : ''}`}
              onClick={() => setAnotherTabDefault(tab.id)}
              key={tab.id}
            >
              {tab.label}
            </button>
          ))
        }
        </div>
        {
            selectedTab === anualidadFuturaTab.id 
                && 
            <AnualidadFuturaComponent />
        }
        {
            selectedTab === capitalizacionTab.id 
                && 
            <AnualidadPresenteComponent />
        }
    </>
  )

}

export default AnualidadComponent