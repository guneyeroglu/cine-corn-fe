export function manageLoadingState(
  setLoadingState: (loading: boolean) => void,
  startTime: number,
  minWaitTime: number = 2000,
): void {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(minWaitTime - elapsedTime, 0);

  setTimeout(() => {
    setLoadingState(false);
  }, remainingTime);
}
