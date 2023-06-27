export interface InforAppModel {
  data: DataInfo;
  success: boolean;
}

export interface DataInfo {
  id: number;
  name: string;
  projectId: number;
  teamId: number;
  h_logoHeader: string;
  c_hotline1: string;
  c_hotline2: string;
  colorTheme: string;
  colorThemeSecond: string;
  colorText: string;
  codeProduct: string;
}
