import React, { FormEvent, useState } from 'react'
import { convertNumber } from '~/utils/conversiones';
import  Image  from '~/components/react/ImageComponent';

const fieldsModel = {
    valorDeuda: 0,
    tiempo: 1,
    tasaInteres: '',
};

const InteresComponent:React.FC = () => {

    const [fields, setFields] = useState(fieldsModel);
    const [interesCompuesto, setInteresCompuesto] = useState(false);
    const [result, setResult] = useState('');
    const [resultTotal, setResultTotal] = useState('');

    const calcularInteresSimple = () => {
        let resultNumber = fields.valorDeuda * (parseFloat(fields.tasaInteres) / 100) * fields.tiempo;
        setResult(convertNumber(resultNumber));
        setResultTotal(convertNumber(resultNumber + fields.valorDeuda));
    }
    
    const calcularInteresCompuesto = () => {
        let tasaMultiplicar = Math.pow((1 + (parseFloat(fields.tasaInteres) / 100)), fields.tiempo);
        let resultNumber = fields.valorDeuda * tasaMultiplicar;
        setResult(convertNumber(resultNumber - fields.valorDeuda));
        setResultTotal(convertNumber(resultNumber));
    }

    const submitInteres = (e: FormEvent) => {
        e.preventDefault();
        //TODO: Validar el formulario
        if(interesCompuesto){
            calcularInteresCompuesto();
        }
        else {
            calcularInteresSimple();
        }
    };



  return (
    <>
      <h3 className="font-bold my-4">Interes simple e Interes compuesto</h3>
      <div className="flex flex-wrap">
            <form 
                id="formulario-amortizacion" 
                className="basis-2/4" 
                noValidate
                onSubmit={submitInteres}
                >

                <div className="form-control w-52">
                    <label className="cursor-pointer label">
                    <span className="label-text">
                        {
                            interesCompuesto ? 'Interés Compuesto': 'Interés Simple'
                        }    
                    </span> 
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={interesCompuesto}
                        onChange={(e) => setInteresCompuesto(e.target.checked)}
                        />
                    </label>
                </div>

                <div className="form-control w-full max-w-xs py-3">
                    <label className="label">
                        <span className="label-text">¿Cuál es el valor de la deuda?</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="$" 
                        className="input input-bordered w-full max-w-xs" 
                        min="0" 
                        id="valor-deuda"
                        name="valorDeuda" required
                        value={fields.valorDeuda}
                        onChange={(e) => setFields({...fields, valorDeuda: Number(e.target.value)})}
                        />
                    <label className="label">
                        <span className="label-text-alt">El valor de la deuda no puede estar en blanco o ser negativo.</span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs py-3">
                    <label className="label">
                        <span className="label-text">¿Cuál es el número de pagos?</span>
                    </label>
                    <input 
                        type="number" 
                        placeholder="1" 
                        className="input input-bordered w-full max-w-xs" 
                        name="numeroPagos" 
                        id="numero-pagos" 
                        min="1" 
                        max="1000" 
                        required
                        value={fields.tiempo}
                        onChange={(e) => setFields({...fields, tiempo: Number(e.target.value)})}
                        />
                    <label className="label">
                        <span className="label-text-alt">El número de pagos debe estar entre 1 y 1000.</span>
                    </label>
                </div>

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

                <div className="">
                    <button className="btn btn-active btn-primary">Calcular { interesCompuesto ? 'Interes compuesto' : 'Interes simple'}</button>
                </div>
            </form>
            {
                result && resultTotal &&
                <div className="basis-1/4">
                    <div className="card w-96 bg-base-100 shadow-xl my-8">
                        <div className="card-body">
                            <h2 className="card-title">{result}</h2>
                            <p>Este es el valor del interes</p>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{resultTotal}</h2>
                            <p>Este es el valor total</p>
                        </div>
                    </div>
                </div>
            }
            {
                !result && !resultTotal && (
                    <Image></Image>
                )
            }
      </div>
    </>
  )

}

export default InteresComponent