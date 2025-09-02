export interface Menu {
  label: string;
  icon?: string;
  path?: string;
  isActive: boolean;
  isDisabled?: boolean;
  children?: Menu[];
}
