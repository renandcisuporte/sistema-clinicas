export interface PdfGenerator<T> {
  generate(data: ReadonlyArray<T>, payload?: any): Promise<Uint8Array>
}
