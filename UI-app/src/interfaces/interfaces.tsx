export interface IUserLogin {
  username: String;
  password: String;
}

export interface IRecordData {
  day: Date;
  value: Number;
}

export interface IMeasureDate {
  currentRead: Number;
  monthTotal: Number;
  dailyUsage: IRecordData[];
}

export interface IUserData {
  gasData: IMeasureDate;
  waterData: IMeasureDate;
}

export interface ITokenUser {
  exp: number;
  iat: number;
  role: string;
  userId: number;
  username: string;
}

export interface IApMeasure {
  id: Number;
  usage: Number;
}
export interface IAdminBoard {
  gas: IApMeasure[];
  water: IApMeasure[];
}
