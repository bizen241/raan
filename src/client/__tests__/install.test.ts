import { installApp } from "../install";

let controllerChangeHandler: () => void;

const registrationMock = {
  update: () => Promise.resolve()
} as ServiceWorkerRegistration;

const serviceWorkerMock = {
  addEventListener: ((_: string, callback: () => void) => (controllerChangeHandler = callback)) as any,
  register: (async () => registrationMock) as any,
  controller: null
} as ServiceWorkerContainer;

jest.useFakeTimers();

const spyLog = jest.spyOn(console, "log");
spyLog.mockImplementation(message => message);

beforeEach(() => {
  spyLog.mockClear();
});

afterAll(() => {
  spyLog.mockRestore();
});

test("install app / succcess", async () => {
  serviceWorkerMock.register = async () => registrationMock;

  await installApp(serviceWorkerMock);

  controllerChangeHandler();
  controllerChangeHandler();

  expect(spyLog).toBeCalledTimes(1);
  expect(spyLog.mock.results[0].value).toEqual("update found");
});

test("install app / failure", async () => {
  serviceWorkerMock.register = async () => {
    throw new Error();
  };

  await installApp(serviceWorkerMock);

  expect(spyLog).toBeCalledTimes(1);
  expect(spyLog.mock.results[0].value).toEqual("failed to register a ServiceWorker");
});