export default interface UpdateEntityInput<T> {
  data: { id: number } & Partial<T>;
}
