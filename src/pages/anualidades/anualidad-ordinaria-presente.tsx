import React, { FormEvent, useState } from 'react'
import { convertNumber, interesEfectivaI, interesNominalJ } from '~/utils/conversiones';

const fieldsModel = {
    valorPresente: 0,
    valorCuota: 0,
    numeroPagos: 1,
    modalidadPago: 0,
    tasaInteres: '',
    modalidadInteres: '',
};

const AnualidadPresenteComponent:React.FC = () => {

    const [fields, setFields] = useState(fieldsModel);
    const [findCuota, setFindCuota] = useState(false);
    const [cuota, setCuota] = useState<string>('');
    const [valorPresente, setValorPresente] = useState<string>('');
    const calcularValorPresente = () => {

        let inte = parseFloat(fields.tasaInteres) / 100;
        let auxtime = -1 * fields.numeroPagos;
        let tasa = Math.pow((1 + inte), auxtime)
        let result = fields.valorCuota * ((1 - tasa) / inte)
        setValorPresente(convertNumber(result));
    }

    const calcularValorCuota = () => {
        let inte = parseFloat(fields.tasaInteres) / 100;
        let auxtime = -1 * fields.numeroPagos;
        let tasa = Math.pow((1 + inte), auxtime)
        let result = fields.valorPresente / ((1 - tasa) / inte);
        setCuota(convertNumber(result));
    }


    const submitAnualidadPresente = (e: FormEvent) => {
        e.preventDefault();
        //TODO: Validar el formulario
        setCuota('');
        setValorPresente('');
        calcularValorCuota();
        calcularValorPresente();
    };



  return (
    <>
      <div className="flex flex-wrap">
            <form 
                id="formulario-amortizacion" 
                className="basis-2/4" 
                noValidate
                onSubmit={submitAnualidadPresente}
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
                    
                <div className="form-control w-52">
                    <label className="cursor-pointer label">
                    <span className="label-text">¿Desea calcular la cuota?</span> 
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={findCuota}
                        onChange={(e) => setFindCuota(e.target.checked)}
                        />
                    </label>
                </div>

                {
                    !findCuota && 

                    <div className="form-control w-full max-w-xs py-3">
                        <label className="label">
                            <span className="label-text">Valor de la cuota</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="$" 
                            className="input input-bordered w-full max-w-xs" 
                            min="0" 
                            id="valor-deuda"
                            name="valorDeuda" required
                            value={fields.valorCuota}
                            onChange={(e) => setFields({...fields, valorCuota: Number(e.target.value)})}
                            />
                        <label className="label">
                            <span className="label-text-alt">El valor de la cuota no puede estar en blanco o ser negativo.</span>
                        </label>
                    </div>
                }

                {
                    findCuota && 

                    <div className="form-control w-full max-w-xs py-3">
                        <label className="label">
                            <span className="label-text">Valor presente</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="$" 
                            className="input input-bordered w-full max-w-xs" 
                            min="0" 
                            id="valor-deuda"
                            name="valorDeuda" required
                            value={fields.valorPresente}
                            onChange={(e) => setFields({...fields, valorPresente: Number(e.target.value)})}
                            />
                        <label className="label">
                            <span className="label-text-alt">El valor presente no puede estar en blanco o ser negativo.</span>
                        </label>
                    </div>
                }
                

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
                        value={fields.numeroPagos}
                        onChange={(e) => setFields({...fields, numeroPagos: Number(e.target.value)})}
                        />
                    <label className="label">
                        <span className="label-text-alt">El número de pagos debe estar entre 1 y 1000.</span>
                    </label>
                </div>

                <div className="">
                    <button className="btn btn-active btn-primary">
                        {
                            findCuota ? 'Calcular valor de la cuota' : 'Calcular valor presente'
                        }
                    </button>
                </div>
            </form>
            {
                findCuota && cuota &&
                <div className="basis-2/4">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{cuota}</h2>
                            <p>Este es el valor de tu cuota</p>
                        </div>
                    </div>
                </div>
            }
            {
                !findCuota && valorPresente &&
                <div className="basis-2/4">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{valorPresente}</h2>
                            <p>Este es el valor presente</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </>
  )

}

export default AnualidadPresenteComponent