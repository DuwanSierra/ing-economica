export const interesNominalJ = [
    { code: 'NM', value: 12, label: 'Nominal Mensual' },
    { code: 'NB', value: 6, label: 'Nominal Bimestral' },
    { code: 'NT', value: 4, label: 'Nominal Trimestral' },
    { code: 'NC', value: 3, label: 'Nominal Cuatrimestral' },
    { code: 'NS', value: 2, label: 'Nominal Semestral' },
    { code: 'MV', value: 12, label: 'Vencida Mensual' },
    { code: 'BV', value: 6, label: 'Vencida Bimestral' },
    { code: 'TV', value: 4, label: 'Vencida Trimestral' },
    { code: 'CV', value: 3, label: 'Vencida Cuatrimestral' },
    { code: 'SV', value: 2, label: 'Vencida Semestral' },
    { code: 'CM', value: 12, label: 'Anticipada Mensual' },
    { code: 'CB', value: 6, label: 'Anticipada Bimestral' },
    { code: 'CT', value: 4, label: 'Anticipada Trimestral' },
    { code: 'CC', value: 3, label: 'Anticipada Cuatrimestral' },
    { code: 'CS', value: 2, label: 'Anticipada Semestral' },
];

export const interesEfectivaCapitalizar = [
    { code: 'EM', value: 12, label: 'Efectiva mensual' },
    { code: 'EB', value: 6, label: 'Efectiva bimestral' },
    { code: 'ET', value: 4, label: 'Efectiva trimestral' },
    { code: 'EC', value: 3, label: 'Efectiva cuatrimestral' },
    { code: 'ES', value: 2, label: 'Efectiva semestral' },
    { code: 'EA', value: 1, label: 'Efectiva anual' },
    { code: 'CM', value: 12, label: 'Convertible mensual' },
    { code: 'CB', value: 6, label: 'Convertible bimestral' },
    { code: 'CT', value: 4, label: 'Convertible trimestral' },
    { code: 'CC', value: 3, label: 'Convertible cuatrimestral' },
    { code: 'CS', value: 3, label: 'Convertible semestral' },
    { code: 'CA', value: 2, label: 'Convertible anual' },
]

export const interesEfectivaI = [
    ...interesEfectivaCapitalizar,
    { code: 'PM', value: 12, label: 'Periódica mensual' },
    { code: 'PB', value: 6, label: 'Periódica bimestral' },
    { code: 'PT', value: 4, label: 'Periódica trimestral' },
    { code: 'PC', value: 3, label: 'Periódica cuatrimestral' },
    { code: 'PS', value: 2, label: 'Periódica semestral' },
    { code: 'PA', value: 1, label: 'Periódica anual' },
];



export const modalidadPago = [
    { value: 12, label: 'Mensual' },
    { value: 6, label: 'Bimestral' },
    { value: 4, label: 'Trimestral' },
    { value: 3, label: 'Cuatrimestral' },
    { value: 2, label: 'Semestral' },
    { value: 1, label: 'Anual' },
];

/**
 * Convierte la tasa de interes a decimales usando dependiendo de si está en efectiva  `i` o en nominal `j`
 * @param { modalidadPago } Modalidad de pago @see modalidadPago
 * @param { tasaInteres } Tasa de interes
 * @param { modalidadInteres } Código Modalidad del interes @see interesNominalJ @see interesEfectivaI
 * @returns 
 */
export const convertirInteres = (modalidadPago: number, tasaInteres: number, modalidadInteres: string) => {
    // Busca la modalidad de interes en la lista de j
    let val = interesNominalJ.filter(k => k.code === modalidadInteres);

    tasaInteres /= 100;

    // Si la modalidad de interes esta en j
    if (val.length > 0) {
        tasaInteres /= val[0].value;
    } else {
        // Busca la modalidad de interes en la lista de i
        val = interesEfectivaI.filter(k => k.code === modalidadInteres);
    }

    const valueI = val[0].value;

    // Valida si no están en el mismo periodo de tiempo el pago y el interes, si es asi, los convierte al mismo periodo de tiempo
    if (modalidadPago !== valueI) {
        const n = valueI;
        const value = Math.pow((1 + tasaInteres), n);
        tasaInteres = Math.pow(value, 1 / modalidadPago) - 1;
    }

    return tasaInteres;
}

export const convertirTasasDeInteres = (tasaInteres: number, codigoTasaOrigen: string, codigoTasaDestino: string) => {
    let origen = interesEfectivaI.filter(k => k.code === codigoTasaOrigen);
    const destinoOriginal = interesEfectivaI.filter(k => k.code === codigoTasaDestino);
    let destino = interesEfectivaI.filter(k => k.code === codigoTasaDestino);

    tasaInteres /= 100;

    // Valida si origen es j y destino es i
    if (origen.length == 0 && destino.length > 0) {
        origen = interesNominalJ.filter(k => k.code === codigoTasaOrigen);
        if(origen.length == 0) {
            throw new Error('Origen not found');
        }
        tasaInteres /= origen[0].value;
    }

    if (origen.length == 0) {
        origen = interesNominalJ.filter(k => k.code === codigoTasaOrigen);
    }

    if (destino.length == 0) {
        destino = interesNominalJ.filter(k => k.code === codigoTasaDestino);
    }

    // Valida si no están en el mismo periodo de tiempo el origen y el destino, si es asi, los convierte al mismo periodo de tiempo
    if (origen[0].value != destino[0].value) {
        const n = origen[0].value;
        const m = destino[0].value;
        const value = Math.pow((1 + tasaInteres), n);
        tasaInteres = Math.pow(value, 1 / m) - 1;
    }


    // Valida si origen es i y destino es j
    if (origen.length > 0 && destinoOriginal.length == 0) {
        const destinoJ = interesNominalJ.filter(k => k.code === codigoTasaDestino);
        if(destinoJ.length == 0) {
            throw new Error('Destino not found');
        }
        tasaInteres *= destinoJ[0].value;
    }


    tasaInteres *= 100;

    return tasaInteres.toFixed(3);
}

/**
 * Calcula la cuota usando la formula de valor presente
 * @param { valorDeuda } El valor de la deuda 
 * @param { interes } El interes 
 * @param { nroPagos } El número de cuotas
 * @returns El valor de la cuota
 */
export const calcularCuota = (valorDeuda: number, interes: number, nroPagos: number) => {
    const bottomPart = (1 - Math.pow(1 + interes, (nroPagos * -1))) / interes;
    const a = valorDeuda / bottomPart;

    return parseFloat(a.toFixed(3));
}




/**
 * Calcula la cuota futura usando la formula de valor presente
 * @param { valorDeuda } El valor de la deuda 
 * @param { interes } El interes 
 * @param { nroPagos } El número de cuotas
 * @returns El valor de la cuota
 */
export const calcularCuotaFutura = (valorDeuda: number, interes: number, nroPagos: number) => {
    const bottomPart = (Math.pow(1 + interes, nroPagos) - 1) / interes;
    const a = valorDeuda / bottomPart;

    return parseFloat(a.toFixed(3));
}

/**
 * Convierte un valor a pesos colombianos
 * @param {El valor a convertir} value 
 * @returns 
 */
export const convertNumber = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}