// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseDataBase = Record<string, any> | undefined;

export interface ResponseData<T extends ResponseDataBase = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MenuHeader {
  title: string;
  description: string;
  logo: string;
  phoneNumber: string;
  email: string;
  address: string;
  openingHours: string;
}

export interface MenuPrice {
  id: string;
  value: number;
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  prices: MenuPrice[];
  description: string;
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  header: MenuHeader;
  sections: MenuSection[];
}
