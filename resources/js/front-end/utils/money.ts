export const formatMoney = (x: number) =>
  Number(x.toFixed(1)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
