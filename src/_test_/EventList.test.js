import { render, screen } from "@testing-library/react";
import EventList from "../components/Eventlist";
import mockData from "../mock-data";

const allEvents = mockData;

describe("<EventList /> component", () => {
  test("renders correct number of events", async () => {
    render(<EventList events={allEvents} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

  test('has an element with "list" role', () => {
    render(<EventList events={allEvents} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
