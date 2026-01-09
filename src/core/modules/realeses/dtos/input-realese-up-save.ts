export type InputRealeseUpSave = {
  clinicId: string
  realeses: Record<
    string,
    Record<string, { price: string; selected?: boolean }>
  >
}
