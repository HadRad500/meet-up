import { render, screen, within, waitFor } from "@testing-library/react";
import { getEvents } from '../api';
import EventList from "../components/Eventlist";
import App from "../App";
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

describe('<EventList /> integration', () => {
    test('renders a list of 32 events when the app is mounted and rendered', async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBeGreaterThan(0);
        });
    });
})
