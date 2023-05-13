import React, { useState } from 'react'

const CapitalizacionComponent: React.FC = () => {
    
  return (
    <>
      <div className="tab-pane fade" id="nav-capitalizacion" role="tabpanel" tabIndex={0}>
                <form id="formulario-capitalizacion" className="row g-3 mt-2 needs-validation" noValidate>
                    <div className="col-md-12">
                        <label htmlFor="valorCapitalizable" className="form-label">Valor a capitalizar</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" id="valorCapitalizable" required></input>
                            <span className="input-group-text">.00</span>
                            <div className="invalid-feedback">
                                Ingrese un valor a capitalizar válido.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="numeroPagos" className="form-label">Número de pagos</label>
                        <input type="number" className="form-control" id="numeroPagos" required></input>
                        <div className="invalid-feedback">
                            Ingrese un número de pagos válido.
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="modalidadPago" className="form-label">Modalidad de pago</label>
                        <select id="modalidadPago" className="form-select" required>
                            <option selected disabled value="">Seleccione...</option>
                            <option value="12">Mensual</option>
                            <option value="6">Bimestral</option>
                            <option value="4">Trimestral</option>
                            <option value="3">Cuatrimestral</option>
                            <option value="2">Semestral</option>
                            <option value="1">Anual</option>
                        </select>
                        <div className="invalid-feedback">
                            Seleccione una opción válida.
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="interes" className="form-label">Interes (En porcentaje)</label>
                        <div className="input-group">
                            <input type="text" inputMode="numeric" className="form-control" id="interes" min="1" max="100"
                                pattern="\d*" required></input>
                            <span className="input-group-text">%</span>
                            <div className="invalid-feedback">
                                Ingrese un interes válido.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="modalidadInteres" className="form-label">Modalidad del interes</label>
                        <select id="modalidadInteres" className="form-select" required>
                            <option selected disabled value="">Seleccione...</option>
                            <option value="EM">Efectivo Mensual</option>
                            <option value="ET">Efectivo Trimestral</option>
                            <option value="ES">Efectivo Semestral</option>
                            <option value="EA">Efectivo Anual</option>
                            <option value="CM">Convertible Mensual</option>
                            <option value="CT">Convertible Trimestral</option>
                            <option value="CS">Convertible Semestral</option>
                            <option value="CA">Convertible Anual</option>
                        </select>
                        <div className="invalid-feedback">
                            Seleccione una opción válida.
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Mostrar tabla de capitalización</button>
                    </div>
                </form>
  
                <div id="datos-capitalizacion" className="invisible mt-4">
                    <hr />
                    <h3 id="title-tabla-capitalizacion" className="mt-3">Tabla de
                        Capitalización
                    </h3>
  
                    <div className="table-responsive">
                        <table id="tabla-capitalizacion" className="table table-bordered text-center mt-3"></table>
                    </div>
                </div>
                </div>
    </>
  )

}

export default CapitalizacionComponent