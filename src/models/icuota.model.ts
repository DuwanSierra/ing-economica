export interface ICuotaModel {
    periodo: number;
    saldo: number;
    interes: number;
    cuota: number;
    amortizacion: number;
}

export interface ICuotaCurrencyModel {
    periodo: string;
    saldo: string;
    interes: string;
    cuota: string;
    amortizacion: string;
}