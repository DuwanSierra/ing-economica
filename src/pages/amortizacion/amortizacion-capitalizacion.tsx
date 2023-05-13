import React, { useState } from 'react'
import AmortizacionComponent from './amortizacion';
import CapitalizacionComponent from './capitalizacion';


const amortizacionTab = {
    id: 'amortizacion',
    label: 'Amortización',
};
const capitalizacionTab = {
    id: 'capitalizacion',
    label: 'Capitalización',
};

const tabOptions = [
    amortizacionTab,
    capitalizacionTab
];

const AmortizacionCapitalizacionComponent:React.FC = () => {

    const [selectedTab, setSelectTab] = useState(amortizacionTab.id);


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
            selectedTab === amortizacionTab.id 
                && 
            <AmortizacionComponent />
        }
        {
            selectedTab === capitalizacionTab.id 
                && 
            <CapitalizacionComponent />
        }
    </>
  )

}

export default AmortizacionCapitalizacionComponent