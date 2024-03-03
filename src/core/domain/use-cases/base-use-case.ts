export interface UseCase<TRequest, TResult> {
    execute(request: TRequest): Promise<TResult>;
}