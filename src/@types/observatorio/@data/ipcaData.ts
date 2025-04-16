import { IpcaGeralHeaders, IpcaGrupoHeaders, IpcaTabelaHeaders } from "../@fetch/ipca";
import { DataWithFilters } from "../shared";

export interface IpcaGeralData extends DataWithFilters<IpcaGeralHeaders> {}

export interface IpcaGrupoData extends DataWithFilters<IpcaGrupoHeaders> {}

export interface IpcaTabelaData {
  id: "ipca-tabelas";
  geral: IpcaGeralData;
  tabelas: DataWithFilters<IpcaTabelaHeaders>;
}

export type IpcaDataResult = 
  | { id: "ipca"; geral: IpcaGeralData }
  | { id: "ipca-grupos"; grupos: IpcaGrupoData }
  | IpcaTabelaData;
