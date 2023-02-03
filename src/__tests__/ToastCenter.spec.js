import { shallowMount } from "@vue/test-utils";
import ToastCenter from "../components/ToastCenter.vue";

describe("ToastCenter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ToastCenter);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("adds a toast to the toasts array", () => {
    wrapper.vm.addToast("A message", "success");
    expect(wrapper.vm.toasts.length).toBe(1);
    expect(wrapper.vm.toasts[0].message).toBe("A message");
    expect(wrapper.vm.toasts[0].type).toBe("success");
  });

  it("renders toasts in the template", async () => {
    wrapper.vm.addToast("A message", "success");
    wrapper.vm.addToast("Another message", "warn");
    wrapper.vm.addToast("Yet another message", "error");

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".toast").length).toBe(3);
  });

  it("removes a toast from the toasts array", async () => {
    wrapper.vm.addToast("A message", "success");
    wrapper.vm.addToast("Another message", "warn");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.toasts.length).toBe(2);
    expect(wrapper.findAll(".toast").length).toBe(2);

    wrapper.vm.removeToast(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".toast").length).toBe(1);
  });
});
