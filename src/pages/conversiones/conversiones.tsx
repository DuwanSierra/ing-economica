import React, { useState } from 'react';
import { interesNominalJ, interesEfectivaI, convertirTasasDeInteres } from '~/utils/conversiones';


const modalidadInteresOptions = [
  ...interesNominalJ,
  ...interesEfectivaI
];

const fieldsModel = {
  modalidadInteresOrigen: '',
  modalidadInteresDestino: '',
  tasaInteres: '',
};

const ConversionesComponent:React.FC = () => {
  
  const [fields, setFields] = useState(fieldsModel);
  const [tasaInteresConvertida, setTasaInteresConvertida] = useState<string>('');

  const submitConversionTasa = (e: FormEvent) => {
    e.preventDefault();
    //TODO validar que los campos sean correctos
    setTasaInteresConvertida('');
    const result = convertirTasasDeInteres(parseFloat(fields.tasaInteres), fields.modalidadInteresOrigen, fields.modalidadInteresDestino);
    setTasaInteresConvertida(result);
  };

  return (
    <>
      <div className="flex flex-wrap">
            <form 
                id="formulario-amortizacion" 
                className="basis-2/4" 
                noValidate
                onSubmit={submitConversionTasa}
            >   

                <div className="form-control w-full max-w-xs py-3">
                    <label className="label">
                        <span className="label-text">Tasa de interés en porcentaje</span>
                    </label>
                    <input 
                        type="text" 
                        inputMode="numeric" 
                        className="input input-bordered w-full max-w-xs" 
                        id="interes"
                        name="interes"
                        pattern="(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$"
                        required
                        value={fields.tasaInteres}
                        onChange={(e) => setFields({...fields, tasaInteres: e.target.value})}
                        ></input>
                    <label className="label">
                        <span className="label-text-alt">La tasa de interes es requerida.</span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs py-3">
                    <label className="label">
                        <span className="label-text">Seleccione la modalidad del interés</span>
                    </label>
                    <select 
                        className="select select-bordered"
                        defaultValue={fields.modalidadInteresOrigen}
                        name="modalidadInteresOrigen"
                        id="modalidad-interes-origen"
                        required
                        onChange={(e) => setFields({...fields, modalidadInteresOrigen: e.target.value})}
                        >
                        <option disabled value="">Seleccione...</option>
                        {
                            modalidadInteresOptions.map((option, index) => (
                                <option key={index} value={option.code}>{option.label}</option>
                            ))
                        }
                    </select>
                    <label className="label">
                        <span className="label-text-alt">Seleccione una opción válida.</span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs py-3">
                    <label className="label">
                        <span className="label-text">Seleccione la modalidad del interés a la que deseas convertir</span>
                    </label>
                    <select 
                        className="select select-bordered"
                        defaultValue={fields.modalidadInteresDestino}
                        name="modalidadInteresDestino"
                        id="modalidad-interes-destino"
                        required
                        onChange={(e) => setFields({...fields, modalidadInteresDestino: e.target.value})}
                        >
                        <option disabled value="">Seleccione...</option>
                        {
                            modalidadInteresOptions.map((option, index) => (
                                <option key={index} value={option.code}>{option.label}</option>
                            ))
                        }
                    </select>
                    <label className="label">
                        <span className="label-text-alt">Seleccione una opción válida.</span>
                    </label>
                </div>

                <div className="">
                    <button className="btn btn-active btn-primary">
                        Convertir
                    </button>
                </div>
            </form>
            {
                tasaInteresConvertida &&
                <div className="basis-2/4">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{tasaInteresConvertida}%</h2>
                            <p>Este es el valor de la tasa de interes convertida</p>
                        </div>
                    </div>
                </div>
            }
      </div>
    </>
  )

}

export default ConversionesComponent