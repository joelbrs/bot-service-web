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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProductStatus {
  export const values = (): [string, ...string[]] => {
    return [ProductStatus.DISPONIVEL, ProductStatus.INDISPONIVEL];
  };
}
