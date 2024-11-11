import { SubProductDtoOut } from "./subproduct";

export interface ProductDtoOut {
  id: string;
  name: string;
  status: "DISPONIVEL" | "INDISPONIVEL";
}

export interface ProductDetailsDtoOut extends ProductDtoOut {
  subProducts: SubProductDtoOut[];
}
