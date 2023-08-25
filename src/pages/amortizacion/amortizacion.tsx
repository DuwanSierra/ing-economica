import React, { FormEvent, useState } from 'react'
import { ICuotaCurrencyModel, ICuotaModel } from '~/models/icuota.model';
import { calcularCuota, convertNumber, convertirInteres, interesEfectivaI, interesNominalJ, modalidadPago } from '~/utils/conversiones';
import  Image  from '~/components/react/ImageComponent';

const modalidadInteresOptions = [
    ...interesNominalJ,
    ...interesEfectivaI
];

const fieldsModel = {
    valorDeuda: 0,
    numeroPagos: 1,
    modalidadPago: 0,
    tasaInteres: '',
    modalidadInteres: '',
};

const AmortizacionComponent:React.FC = () => {

    const [fields, setFields] = useState(fieldsModel);
    const [tablaAmortizacion, setTablaAmortizacion] = useState<ICuotaCurrencyModel[]>([]);


    const crearTablaAmortizacion = (valorDeuda: number, numPagos: number, cuota: number, interes: number) => {
        let periodo = 0;
        let saldo = valorDeuda;
        let valorInteres = 0;
        let valorCuota = 0;
        let amortizacion = 0;
        let newTablaAmortizacion: ICuotaCurrencyModel[] = [];
        while (periodo <= numPagos) {
            const row = {
                    periodo: `${periodo}`,
                    saldo: convertNumber(saldo),
                    interes: convertNumber(valorInteres),
                    cuota: convertNumber(valorCuota),
                    amortizacion: convertNumber(amortizacion),
            };
            valorInteres = saldo * interes;
    
            if (saldo < valorCuota) valorCuota = saldo + valorInteres;
            else if (periodo == 0) valorCuota = cuota;
    
            amortizacion = valorCuota - valorInteres;
            saldo -= amortizacion;
            periodo++;
            newTablaAmortizacion.push(row);
        }
        setTablaAmortizacion(newTablaAmortizacion);
    }


    const submitAmortizacion = (e: FormEvent) => {
        e.preventDefault();
        //TODO: Validar el formulario
        /**
         * Calcula el interes real de acuerdo a la modalidad de pago y la modalidad del interes
         */
        const interesReal = convertirInteres(fields.modalidadPago, parseFloat(fields.tasaInteres), fields.modalidadInteres);
        /**
         * Calcula la cuota de acuerdo al valor de la deuda, el interes real y el número de pagos
         */
        const cuota = calcularCuota(fields.valorDeuda, interesReal, fields.numeroPagos);
        /**
         * Crea la tabla de amortización
         */
        crearTablaAmortizacion(fields.valorDeuda, fields.numeroPagos, cuota, interesReal);
    };



  return (
    <>
      <div className="flex flex-wrap">
        <form id="formulario-amortizacion" className="basis-2/4" noValidate onSubmit={submitAmortizacion}>
          <div className="container p-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Campo: Valor deuda */}
              <div className="form-control w-full max-w-xs py-3 px-3">
                <label className="label">
                  <span className="label-text">¿Cuál es el valor de la deuda?</span>
                </label>
                <input
                  type="text"
                  placeholder="$"
                  className="input input-bordered w-full max-w-xs"
                  id="valor-deuda"
                  name="valorDeuda"
                  required
                  value={fields.valorDeuda}
                  onChange={(e) => setFields({ ...fields, valorDeuda: Number(e.target.value.replace(/\D/, '')) })}
                />
                <label className="label">
                  <span className="label-text-alt text-violet-800">El valor de la deuda no puede estar en blanco o ser negativo.</span>
                </label>
              </div>

              {/* Campo: Número pagos */}
              <div className="form-control w-full max-w-xs py-3 px-3">
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
                  onChange={(e) => setFields({ ...fields, numeroPagos: Number(e.target.value) })}
                />
                <label className="label">
                  <span className="label-text-alt text-violet-800">El número de pagos debe estar entre 1 y 1000.</span>
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
                  type="text"
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
            </div>
            <div className="grid grid-cols-1">
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

            {/* Botón: Mostrar Tabla */}
            <div className="">
              <button className="btn btn-active btn-primary btn-block">Mostrar tabla de amortización</button>
            </div>
          </div>
        </form>

        <div className="basis-2/4">
          {tablaAmortizacion.length > 0 && (
            <>
              <h3 className="my-3 text-red-600">Tabla de Amortización</h3>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Periodo</th>
                      <th>Saldo</th>
                      <th>Interes</th>
                      <th>Amortización</th>
                      <th>Cuota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaAmortizacion.map((row, index) => (
                      <tr key={index}>
                        <th>{row.periodo}</th>
                        <th>{row.saldo}</th>
                        <th>{row.interes}</th>
                        <th>{row.amortizacion}</th>
                        <th>{row.cuota}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {!tablaAmortizacion.length && <Image></Image>}
        </div>
      </div>
    </>
  );

}

export default AmortizacionComponent