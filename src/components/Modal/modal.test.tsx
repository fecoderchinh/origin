import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Modal from "./modal";

describe("Modal", () => {
  it("should render the modal", () => {
    render(<Modal open={false} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } title={""} desc={""} />)
  })
})