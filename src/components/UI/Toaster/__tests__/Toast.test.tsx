import {
  render,
  renderHook,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import ToasterProvider from "../../../../context/ToasterProvider/ToasterProvider";
import Toaster from "../Toaster";
import useToast from "../utils/useToast";
import { newToastDefaults } from "../../../../context/ToasterProvider/newToastDefaults";
import * as toastLifecycleUtils from "../utils/toastLifecycle";
import {
  createToastLifecycle,
  delay,
  ToastLifecycle,
} from "../utils/toastLifecycle";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { ToastControls } from "../utils/types";

jest
  .spyOn(toastLifecycleUtils, "delay")
  .mockImplementation(
    (ms) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(), Math.max(Math.floor(ms / 1000), 10))
      )
  );

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToasterProvider>
    <Toaster />
    {children}
  </ToasterProvider>
);

const defineToast = async ({
  text,
  result,
  pendingLifecycles,
}: {
  text: string;
  result: {
    current: ToastControls;
  };
  pendingLifecycles: ToastLifecycle[];
}) => {
  await act(async () => {
    result.current.define({
      contents: <p>{text}</p>,
      opacity: newToastDefaults.opacity,
      pendingLifecycles,
    });
  });
  console.log("end act");
};

describe("Toast, Toaster and Provider components", () => {
  const mockId = "mockId";
  const text = "I am a piece of toast";

  it("summons toast when called", async () => {
    const { result } = renderHook(() => useToast(mockId), { wrapper });

    expect(screen.queryByText(text)).not.toBeInTheDocument();

    await defineToast({
      pendingLifecycles: [
        new ToastLifecycle(async () => {
          await delay(300);
          return null;
        }),
      ],
      result,
      text,
    });

    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it("leaves once time passes", async () => {
    const { result } = renderHook(() => useToast(mockId), {
      wrapper,
    });

    expect(screen.queryByText(text)).not.toBeInTheDocument();

    act(() => {
      result.current.define({
        contents: <p>{text}</p>,
        opacity: newToastDefaults.opacity,
        pendingLifecycles: [
          new ToastLifecycle(async () => {
            await delay(100);
            console.log("end delay");
            return "eat";
          }),
        ],
      });
      // defineToast({
      //   pendingLifecycles: [
      //     new ToastLifecycle(async () => {
      //       await delay(100);
      //       console.log("end delay");
      //       return "eat";
      //     }),
      //   ],
      //   result,
      //   text,
      // });
    });

    expect(screen.queryByText(text)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  });
  it("immediately removes toast if lifecycle is synchronous", async () => {
    const user = userEvent.setup();
    const ToastButton = () => {
      const toastInfo = useToast(mockId);
      const onClick = () => {
        toastInfo.define({
          contents: <p>{text}</p>,
          opacity: newToastDefaults.opacity,
          pendingLifecycles: [new ToastLifecycle(async () => "eat")],
        });
      };
      return <button onClick={onClick}>Create Toast</button>;
    };

    const { queryByText, getByText } = render(
      <ToasterProvider>
        <Toaster />
        <ToastButton />
      </ToasterProvider>
    );

    expect(queryByText(text)).not.toBeInTheDocument();

    await user.click(getByText("Create Toast"));

    expect(queryByText(text)).not.toBeInTheDocument();
  });
  it("keeps toast if the callback returns 'keep'", async () => {
    const user = userEvent.setup();
    const ToastButton = () => {
      const toastInfo = useToast(mockId);
      const onClick = () => {
        toastInfo.define({
          contents: <p>{text}</p>,
          opacity: newToastDefaults.opacity,
          pendingLifecycles: [new ToastLifecycle(async () => "keep")],
        });
      };
      return <button onClick={onClick}>Create Toast</button>;
    };

    const { queryByText, getByText } = render(
      <ToasterProvider>
        <Toaster />
        <ToastButton />
      </ToasterProvider>
    );

    expect(queryByText(text)).not.toBeInTheDocument();

    await user.click(getByText("Create Toast"));

    expect(queryByText(text)).toBeInTheDocument();

    expect(queryByText(text)).toBeInTheDocument();
  });
  it("fades once time passes with default toast", async () => {
    const user = userEvent.setup();
    const ToastButton = () => {
      const toastInfo = useToast(mockId);
      const onClick = () => {
        toastInfo.define({
          contents: <p>{text}</p>,
          opacity: newToastDefaults.opacity,
          pendingLifecycles: [
            createToastLifecycle({
              updateToast: toastInfo.update,
              fadeMs: 1000,
              visibleTime: 1000,
            }),
          ],
        });
      };
      return <button onClick={onClick}>Create Toast</button>;
    };

    const { queryByText, getByText } = render(
      <ToasterProvider>
        <Toaster />
        <ToastButton />
      </ToasterProvider>
    );

    expect(queryByText(text)).not.toBeInTheDocument();

    const getWrapper = () => getByText(text).closest("div")!;

    await user.click(getByText("Create Toast"));
    expect(getWrapper()).toBeInTheDocument();
    expect(getWrapper()).toHaveStyle({ opacity: 1 });

    await waitFor(() => {
      expect(getWrapper()).toHaveStyle({
        opacity: 0,
        transition: "opacity 1000ms ease-in",
      });
    });
  });
});
