import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import InputNumber from "./input-number";

describe("CustomDatePicker", () => {
  it("should render the date picker", () => {
    render(<InputNumber value={0} onChange={function (): void {
      throw new Error("Function not implemented.");
    } } />)
  })
})