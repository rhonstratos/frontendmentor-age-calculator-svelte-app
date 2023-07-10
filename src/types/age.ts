export interface IAge { years: number; months: number; days: number }
export interface IValidatedAge extends IAge { isValid?: boolean }