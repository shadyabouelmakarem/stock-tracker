import { shallowMount } from "@vue/test-utils";
import Header from "../components/Header.vue";

describe("Header.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Header);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the header element", () => {
    expect(wrapper.find(".header").exists()).toBe(true);
  });

  it('renders an anchor element with "/" href', () => {
    const anchor = wrapper.find("a");
    expect(anchor.attributes().href).toBe("/");
  });

  it("renders the svg element with the header-logo class", () => {
    const svg = wrapper.find("svg");
    expect(svg.classes()).toContain("header-logo");
  });
});
