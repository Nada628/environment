export interface TableHeader {
  key: string;
  translatedKey: string;
  index: number;
  isSelected: boolean;
}

export interface DynamicTable {
  headers: TableHeader[];
  data: any[];
}
