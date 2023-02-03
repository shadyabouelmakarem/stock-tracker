import { mount } from "@vue/test-utils";
import App from "../App.vue";

describe("App component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App);
    wrapper.vm.socket.send = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the header component", () => {
    expect(wrapper.findComponent({ name: "Header" }).exists()).toBe(true);
  });

  it("renders the TextField component", () => {
    expect(wrapper.findComponent({ name: "TextField" }).exists()).toBe(true);
  });

  it("renders the Card component", () => {
    expect(wrapper.findComponent({ name: "Card" }).exists()).toBe(true);
  });

  it("renders the Button component", () => {
    expect(wrapper.findComponent({ name: "Button" }).exists()).toBe(true);
  });

  it("renders the ToastCenter component", () => {
    expect(wrapper.findComponent({ name: "ToastCenter" }).exists()).toBe(true);
  });

  it("validates the input ISIN correctly", () => {
    wrapper.find("input").setValue("AA1234567890");
    expect(wrapper.vm.isin).toBe("AA1234567890");
    expect(wrapper.vm.validationError).toBe("");
  });

  it("displays the validation error correctly", () => {
    wrapper.find("input").setValue("");
    expect(wrapper.vm.validationError).toBe("ISIN is required");
  });

  it("submits the form correctly", () => {
    wrapper.find("input").setValue("AA1234567890");
    wrapper.vm.submitForm();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.subscribedStocks).toHaveProperty("AA1234567890");
  });

  it("displays the toast when the WebSocket connection is closed", () => {
    const spy = jest.spyOn(console, "warn");
    wrapper.vm.socket.onclose({ code: 500 });
    expect(spy).toHaveBeenCalledWith(
      "WebSocket connection closed with code: ",
      500
    );
    expect(wrapper.vm.$refs.toastCenter.toasts.length).toBe(1);
  });

  it("displays the toast when the WebSocket connection is re-established", () => {
    const spy = jest.spyOn(console, "log");
    wrapper.vm.subscribedStocks["AA1234567890"] = {};
    wrapper.vm.socket.onopen();
    expect(spy).toHaveBeenCalledWith("WebSocket connection established");
    expect(wrapper.vm.$refs.toastCenter.toasts.length).toBe(1);
  });

  it("adds a new stock item when a new message is received", () => {
    const stock = { isin: "AA1234567890", price: 1, bid: 2, ask: 3 };
    wrapper.vm.socket.onmessage({ data: JSON.stringify(stock) });
    expect(wrapper.vm.subscribedStocks[stock.isin]).toEqual(stock);
  });

  it("remove stock item on unsubscribe", () => {
    const stock = { isin: "AA1234567890", price: 1, bid: 2, ask: 3 };
    wrapper.vm.subscribedStocks[stock.isin] = stock;
    wrapper.vm.unsubscribe(stock.isin);
    expect(wrapper.vm.subscribedStocks).toEqual({});
  });
});
