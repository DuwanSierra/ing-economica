import React, { FormEvent, useState } from 'react';
import { convertirInteres, interesEfectivaI, interesNominalJ, convertNumber, modalidadPago, calcularValorPresenteRP } from '~/utils/conversiones';

const modalidadInteresOptions = [
  ...interesNominalJ,
  ...interesEfectivaI
];

const fieldsModel = {
    rentaPerpetua: 0,
    modalidadPago: 0,
    tasaInteres: '',
    modalidadInteres: ''
};

const PerpetuaComponent: React.FC = () => {

  const [fields, setFields] = useState(fieldsModel);
  const [valorPresente, setvalorPresente] = useState<number>();

  const submitRentaPerpetua = (e: FormEvent) => {
    e.preventDefault();
    //TODO: Validar el formulario
    /**
     * 1. Calcula el interes real de acuerdo a la modalidad de pago y la modalidad del interes
     */
    const interesReal = convertirInteres(fields.modalidadPago, parseFloat(fields.tasaInteres), fields.modalidadInteres);
    /**
     * 2. Calcula el valor presente de la renta perpetua:
     */
    const result = calcularValorPresenteRP(fields.rentaPerpetua, interesReal);
    setvalorPresente(result);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <form id="formulario-amortizacion" className="basis-2/4" noValidate onSubmit={submitRentaPerpetua}>
          <div className="container p-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Campo: Valor renta perpetua */}
              <div className="form-control w-full max-w-xs py-3 px-3">
                <label className="label">
                  <span className="label-text">¿Cuál es el valor de la renta perpetua?</span>
                </label>
                <input
                  type="text"
                  placeholder="$"
                  className="input input-bordered w-full max-w-xs"
                  id="renta-perpetua"
                  name="rentaPerpetua"
                  required
                  value={fields.rentaPerpetua}
                  onChange={(e) => setFields({ ...fields, rentaPerpetua: Number(e.target.value.replace(/\D/, '')) })}
                />
                <label className="label">
                  <span className="label-text-alt text-violet-800">
                    El valor de la renta perpetua no puede estar en blanco o ser negativo.
                  </span>
                </label>
              </div>

              {/* Campo: Modalidad pago */}
              <div className="form-control w-full max-w-xs py-3 px-3">
                <label className="label">
                  <span className="label-text">Seleccione la modalidad de pago</span>
                </label>
                <select
                  className="select select-bordered"
                  defaultValue={fields.modalidadPago}
                  name="modalidadPago"
                  id="modalidad-pago"
                  required
                  onChange={(e) => setFields({ ...fields, modalidadPago: Number(e.target.value) })}
                >
                  <option disabled value="0">
                    Seleccione...
                  </option>
                  {modalidadPago.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label className="label">
                  <span className="label-text-alt text-violet-800">Seleccione una opción válida.</span>
                </label>
              </div>

              {/* Campo: Interes porcentaje */}
              <div className="form-control w-full max-w-xs py-3 px-3">
                <label className="label">
                  <span className="label-text">Tasa de interés en porcentaje</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  className="input input-bordered w-full max-w-xs"
                  id="interes"
                  name="interes"
                  pattern="(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$"
                  required
                  value={fields.tasaInteres}
                  onChange={(e) => setFields({ ...fields, tasaInteres: e.target.value })}
                ></input>
                <label className="label">
                  <span className="label-text-alt text-violet-800">La tasa de interes es requerida.</span>
                </label>
              </div>

              {/* Campo: Modalidad interes */}
              <div className="form-control w-full py-3 px-3">
                <label className="label">
                  <span className="label-text">Seleccione la modalidad del interés</span>
                </label>
                <select
                  className="select select-bordered"
                  defaultValue={fields.modalidadInteres}
                  name="modalidadInteres"
                  id="modalidad-interes"
                  required
                  onChange={(e) => setFields({ ...fields, modalidadInteres: e.target.value })}
                >
                  <option disabled value="">
                    Seleccione...
                  </option>
                  {modalidadInteresOptions.map((option, index) => (
                    <option key={index} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label className="label">
                  <span className="label-text-alt text-violet-800">Seleccione una opción válida.</span>
                </label>
              </div>
            </div>

            {/* Botón: Calcular valor presente */}
            <div className="">
              <button className="btn btn-active btn-primary btn-block">Calcular valor presente</button>
            </div>
          </div>
        </form>
        {valorPresente && (
          <div className="p-4 basis-2/4">
            <div className="flex items-center justify-center h-64">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-red-600">El valor presente es: </h2>
                  <p>{convertNumber(valorPresente)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PerpetuaComponent