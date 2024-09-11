export interface MainHeaderItem {
  role?: string[];
  menuItems?: MenutItem[];
}

export interface MenutItem {
  name: string;
  path?: string;
  action?: string;
  value?: string;
}
