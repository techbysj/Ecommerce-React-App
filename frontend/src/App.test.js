// App.test.js
import { render, screen } from "@testing-library/react";
import SimpleComponent from "./components/SimpleComponent"; // Correct path to SimpleComponent

test("renders learn react text", () => {
  render(<SimpleComponent />);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
