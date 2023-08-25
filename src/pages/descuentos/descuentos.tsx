import React, { useState } from 'react';

const DescuentoBancarioComponent: React.FC = () => {
  const [valorInicial, setValorInicial] = useState<number>(450000);
  const [fechaInicio, setFechaInicio] = useState<string>('2022-12-07');
  const [plazoDias, setPlazoDias] = useState<number>(75);
  const [tasaInteres, setTasaInteres] = useState<number>(30);
  const [fechaDescuento, setFechaDescuento] = useState<string>('2023-01-15');
  const [tasaDescuento, setTasaDescuento] = useState<number>(40);
  const [descuentoBancario, setDescuentoBancario] = useState<number>(0);
  const [valorTransaccion, setValorTransaccion] = useState<number>(0);

  const calcularDescuentoBancario = () => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaDescuentoDate = new Date(fechaDescuento);
    const tiempoDescuento = (fechaDescuentoDate.getTime() - fechaInicioDate.getTime()) / (1000 * 3600 * 24);
    const tasaDescuentoDecimal = tasaDescuento / 100;

    const valorFinal = valorInicial * (1 + (tasaInteres / 100) * (plazoDias / 360));
    const descuento = valorFinal * (tasaDescuentoDecimal * (tiempoDescuento / 360));
    const valorTransaccion = valorFinal - descuento;

    setDescuentoBancario(descuento);
    setValorTransaccion(valorTransaccion);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="container p-3 basis-2/4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Valor Inicial</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={valorInicial}
                onChange={(e) => setValorInicial(parseInt(e.target.value))}
              />
            </div>

            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Fecha de Inicio</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Plazo en días</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={plazoDias}
                onChange={(e) => setPlazoDias(parseInt(e.target.value))}
              />
            </div>

            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Tasa de Interés</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={tasaInteres}
                onChange={(e) => setTasaInteres(parseInt(e.target.value))}
              />
            </div>

            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Fecha de Descuento</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                value={fechaDescuento}
                onChange={(e) => setFechaDescuento(e.target.value)}
              />
            </div>

            <div className="form-control w-full max-w-xs py-3">
              <label className="label">
                <span className="label-text">Tasa de Descuento</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={tasaDescuento}
                onChange={(e) => setTasaDescuento(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Botón: Calcular valor presente */}
          <div className="mt-4">
            <button className="btn btn-active btn-primary btn-block" onClick={calcularDescuentoBancario}>
              Calcular descuento bancario
            </button>
          </div>
        </div>

        <div className="p-4 basis-2/4">
          {descuentoBancario > 0 && (
            <div className="card w-96 bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">Descuento Bancario: {descuentoBancario}</h2>
                <p>Este es el valor del descuento bancario.</p>
              </div>
            </div>
          )}

          {valorTransaccion > 0 && (
            <div className="card w-96 bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">Valor de la Transacción: {valorTransaccion}</h2>
                <p>Este es el valor de la transacción después del descuento bancario.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DescuentoBancarioComponent;