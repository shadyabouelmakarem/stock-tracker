import { shallowMount } from "@vue/test-utils";
import Card from "../components/Card.vue";

describe("Card", () => {
  it("renders a div with class 'card'", () => {
    const wrapper = shallowMount(Card);
    expect(wrapper.find(".card").exists()).toBe(true);
  });

  it("renders its content inside the 'card' div", () => {
    const wrapper = shallowMount(Card, {
      slots: {
        default: "Card content",
      },
    });
    expect(wrapper.find(".card").text()).toBe("Card content");
  });
});
