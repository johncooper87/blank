declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.po" {
  const data: import('ttag/types').LocaleData;
  export default data;
}

