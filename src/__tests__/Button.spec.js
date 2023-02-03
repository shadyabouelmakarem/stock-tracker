import { shallowMount } from "@vue/test-utils";
import Button from "../components/Button.vue";

describe("Button component", () => {
  it('renders a button with a class of "button"', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.classes()).toContain("button");
  });

  it("renders the text inside the component as a slot", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "Subscribe",
      },
    });
    expect(wrapper.find(".button-content").text()).toBe("Subscribe");
  });
});
