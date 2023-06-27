export interface BodyHomeModel {
  website: Website;
  homePage: HomePage;
  statusCode: number;
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

export interface HomePage {
  lstData: LstDaum[];
}

export interface LstDaum {
  isStock: boolean;
  images_second: string;
  price: number;
  priceDrop: number;
  numberStar: number;
  numberRate: number;
  percent: number;
  refId: number;
  linkVideo: string;
  linkBack: string;
  rec_education?: string;
  rec_experience?: string;
  rec_salary?: string;
  createdAt: string;
  id: number;
  name: string;
  websiteName: string;
  websiteId: number;
  domainName: string;
  active: boolean;
  guidId: string;
  parentGuidId: string;
  parentLevel: number;
  sortBy: number;
  type: number;
  imagesMobile?: string;
  images?: string;
  sumary?: string;
  link?: string;
}
