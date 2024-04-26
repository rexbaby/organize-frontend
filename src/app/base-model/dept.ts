import { IDistrict } from './district';

export interface IDept {
  id: number;
  name: string;
  status: number;
  district: IDistrict;
  districtId?: number;
}
