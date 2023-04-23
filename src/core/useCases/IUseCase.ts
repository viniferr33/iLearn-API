export default interface IUseCase<InputDTO, OutputDTO> {
  execute(data: InputDTO): Promise<OutputDTO>;
}
