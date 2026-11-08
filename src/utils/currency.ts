const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Formats a value in reais, e.g. `390` as `R$ 390,00`. */
export function formatCurrency(value: number): string {
  return BRL.format(value);
}
