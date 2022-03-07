import type { History } from "../../index";

export default function GoForward(
  history: History,
  onPopSpy: jest.SpyInstance
) {
  expect(history.location).toMatchObject({
    pathname: "/",
  });

  history.push("/home");
  expect(history.action).toEqual("PUSH");
  expect(history.location).toMatchObject({
    pathname: "/home",
  });
  expect(onPopSpy).not.toHaveBeenCalled();

  history.go(-1);
  expect(history.action).toEqual("POP");
  expect(history.location).toMatchObject({
    pathname: "/",
  });
  expect(onPopSpy).toHaveBeenCalledWith({
    hash: "",
    key: expect.any(String),
    pathname: "/",
    search: "",
    state: null,
  });
  expect(onPopSpy.mock.calls.length).toBe(1);

  history.go(1);
  expect(history.action).toEqual("POP");
  expect(history.location).toMatchObject({
    pathname: "/home",
  });
  expect(onPopSpy).toHaveBeenCalledWith({
    hash: "",
    key: expect.any(String),
    pathname: "/home",
    search: "",
    state: null,
  });
  expect(onPopSpy.mock.calls.length).toBe(2);
}
