import { IDistrict } from './district';

export interface IDept {
  id: number;
  name: string;
  status: number;
  district: IDistrict;
  createdOn: string;
  createdBy: 1;
  updatedOn: string;
  updatedBy: 1;
  districtId?: number;
}
