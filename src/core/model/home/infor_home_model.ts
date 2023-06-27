export interface InforHomeModel {
  website: Website;
  menuHeaderData: MenuHeaderData;
}

export interface Website {
  lstLanguage: LstLanguage[];
  language: Language;
  name: string;
  projectId: number;
  teamId: number;
  h_logoHeader: string;
  h_favicon: string;
  c_hotline1: string;
  c_hotline2: string;
  f_logoFooter: string;
  f_email1: string;
  f_address1: string;
  f_address2: string;
  f_address3: string;
  f_facebook: string;
  f_tiktok: string;
  f_instagram: string;
  f_copyright: string;
  f_footerContent: string;
  f_title1: string;
  f_title3: string;
  f_title4: string;
  layoutName: string;
  domainName: string;
  isFreeShip: boolean;
  isAllowPromotion: boolean;
  totalPriceOrder: number;
  priceShipDefault: number;
  languageMain: string;
  languageGroups: string;
  codeProduct: string;
  isShortForm: boolean;
  idComapany: number;
  id: number;
  active: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface LstLanguage {
  code: string;
  iso: string;
  images: string;
}

export interface Language {
  code: string;
  iso: string;
  images: string;
}

export interface MenuHeaderData {
  lstUtilities: LstUtility[];
  listPolicyInfo: ListPolicyInfo[];
  listMenus: ListMenu[];
}

export interface LstUtility {
  id: number;
  name: string;
  websiteId: number;
  images: string;
  active: boolean;
  parentLevel: number;
  sortBy: number;
  type: number;
  sumary: string;
}

export interface ListPolicyInfo {
  parentId: number;
  refId: number;
  createdAt: string;
  id: number;
  name: string;
  websiteId: number;
  link: string;
  active: boolean;
  parentLevel: number;
  sortBy: number;
  type: number;
}

export interface ListMenu {
  id: number;
  name: string;
  link: string;
  guidId?: string;
  parentGuidId: string;
  rootParentGuidId: string;
  parentLevel: number;
  sortBy: number;
  images?: string;
}
