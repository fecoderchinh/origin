import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Navbar from "./navbar";

describe("Navbar", () => {
  it("should render the navbar", () => {
    render(<Navbar />)
  })
})