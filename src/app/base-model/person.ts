import { IDept } from './dept';

export interface IPerson {
  id: number;
  level: number;
  staff: IStaff;
  dept: IDept;
}

export interface IStaff {
  id?: number;
  level?: number;
  deptId?: number;
  name: string;
  status: number;
  createdBy: number;
  updatedBy: number;
}

