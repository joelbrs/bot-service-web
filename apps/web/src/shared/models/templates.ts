export enum TemplateStatus {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export interface TemplateDtoOut {
  id: string;
  name: string;
  status: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TemplateStatus {
  export const values = (): [string, ...string[]] => {
    return [TemplateStatus.ATIVO, TemplateStatus.INATIVO];
  };
}
