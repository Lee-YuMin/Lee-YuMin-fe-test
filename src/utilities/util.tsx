export const NUMBER = {
  COMMA: (num: number) =>
    num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
};
