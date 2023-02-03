import { mount } from "@vue/test-utils";
import TextField from "../components/TextField.vue";

describe("TextField component", () => {
  it("renders an input element with a class of 'text-field'", () => {
    const wrapper = mount(TextField);
    const input = wrapper.find("input");
    expect(input.classes()).toContain("text-field");
  });

  it("renders an input element with a value matching the 'value' prop", () => {
    const wrapper = mount(TextField, {
      propsData: {
        value: "test value",
      },
    });
    const input = wrapper.find("input");
    expect(input.element.value).toBe("test value");
  });

  it("renders an input element with the default value if no 'value' prop is provided", () => {
    const wrapper = mount(TextField);
    const input = wrapper.find("input");
    expect(input.element.value).toBe("");
  });
});
