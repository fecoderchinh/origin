import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import CustomDatePicker from "./custom-date";

describe("CustomDatePicker", () => {
  it("should render the date picker", () => {
    render(<CustomDatePicker selectedDate={new Date()} setSelectedDate={function (): void {
      throw new Error("Function not implemented.");
    } } />)
  })
})