import { render, screen } from "@testing-library/react";
import Event from "../components/Event";

const mockData = {
  kind: "calendar#event",
  etag: '"3181161784712000"',
  id: "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
  status: "confirmed",
  htmlLink:
    "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
  created: "2020-05-19T19:17:46.000Z",
  updated: "2020-05-27T12:01:32.356Z",
  summary: "Learn JavaScript",
  description:
    "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
  location: "London, UK",
  creator: {
    email: "fullstackwebdev@careerfoundry.com",
    self: true,
  },
  organizer: {
    email: "fullstackwebdev@careerfoundry.com",
    self: true,
  },
  start: {
    dateTime: "2020-05-19T16:00:00+02:00",
    timeZone: "Europe/Berlin",
  },
  end: {
    dateTime: "2020-05-19T17:00:00+02:00",
    timeZone: "Europe/Berlin",
  },
  recurringEventId: "4eahs9ghkhrvkld72hogu9ph3e",
  originalStartTime: {
    dateTime: "2020-05-19T16:00:00+02:00",
    timeZone: "Europe/Berlin",
  },
  iCalUID: "4eahs9ghkhrvkld72hogu9ph3e@google.com",
  sequence: 0,
  reminders: {
    useDefault: true,
  },
  eventType: "default",
};

describe("<Event /> component", () => {
  test("renders event location", async () => {
    render(<Event event={mockData} />);
    expect(screen.getByText(mockData.location)).toBeInTheDocument();
  });

  test("renders event name", () => {
    render(<Event event={mockData} />);
    expect(screen.getByText(mockData.summary)).toBeInTheDocument();
  });

  test("renders event date", () => {
    render(<Event event={mockData} />);
    expect(screen.getByText(mockData.start.dateTime)).toBeInTheDocument();
  });

  test("renders event details button with the title (show details", () => {
    render(<Event event={mockData} />);
    expect(screen.getByText("Show Details")).toBeInTheDocument();
  });

  test("shows/hides details section when user toggles button", () => {
    render(<Event event={mockData} />);
    const showDetailsButton = screen.getByText("Show Details");
  });
});
