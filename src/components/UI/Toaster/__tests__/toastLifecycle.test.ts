import { delay, ToastLifecycle } from "../utils/toastLifecycle";
import { ToastLifecycleFn, ToastResult } from "../utils/types";

jest.useFakeTimers();

describe("ToastLifecycle", () => {
  it.each([["eat"], [null], ["banana" as ToastResult]] as const)(
    "resolves normally if not told to stop",
    async (outpt) => {
      const lifecycleFn = async () => {
        return outpt;
      };
      const toastLife = new ToastLifecycle(lifecycleFn);

      const result = await toastLife.promise;
      expect(result).toBe(outpt);
    }
  );
  it("resolves early if told to stop", async () => {
    const lifecycleFn: ToastLifecycleFn = async ({ checkStopped }) => {
      await delay(300);
      if (checkStopped()) return "stopped" as ToastResult;
      return "bad" as ToastResult;
    };
    const toastLife = new ToastLifecycle(lifecycleFn);
    toastLife.stop();
    await jest.runAllTimersAsync();

    const result = await toastLife.promise;
    expect(result).toBe("stopped");
  });

  it("doesn't refire once stopped", async () => {
    const mockFn = jest.fn();
    const lifecycleFn: ToastLifecycleFn = async ({ checkStopped }) => {
      await delay(300);
      if (checkStopped()) return "stopped" as ToastResult;
      mockFn("should't call");
      return "bad" as ToastResult;
    };
    const toastLife = new ToastLifecycle(lifecycleFn);
    toastLife.stop();
    await jest.runAllTimersAsync();
    await toastLife.promise;

    expect(mockFn).not.toHaveBeenCalled();
  });
});
