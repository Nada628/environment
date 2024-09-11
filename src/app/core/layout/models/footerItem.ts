export interface FooterItem {
  title: string;
  listOfItems: SubItem[];
}

export interface SubItem {
  title: string;
  route: string;
  icon?: string;
}
