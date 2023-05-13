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
