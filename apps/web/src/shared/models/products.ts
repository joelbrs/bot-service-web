import { SubProductDtoOut } from "./subproduct";

export enum ProductStatus {
  DISPONIVEL = "DISPONIVEL",
  INDISPONIVEL = "INDISPONIVEL",
}

export interface ProductDtoOut {
  id: string;
  name: string;
  status: ProductStatus;
}

export interface ProductDetailsDtoOut extends ProductDtoOut {
  subProducts: SubProductDtoOut[];
}
