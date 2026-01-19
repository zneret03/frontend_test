export type SortField = "name" | "company" | "email";

export type SortDirection = "asc" | "desc";

export interface FieldOption {
  label: string;
  value: SortField;
}

export interface DirectionOption {
  label: string;
  value: SortDirection;
}
