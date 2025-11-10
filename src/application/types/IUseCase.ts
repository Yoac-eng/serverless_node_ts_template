export interface IUseCase<TParams, TResult> {
  execute(params: TParams): Promise<TResult>;
}
