import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

const func = jest.fn();

describe("<NumberOfEvents /> component", () => {
  test("checks if element has the role of a text box", () => {
    render(
      <NumberOfEvents
        eventNumber={32}
        onEventNumberChange={func}
        setErrorAlert={func}
      />
    );
    const numberTextBox = screen.queryByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass("textbox");
  });

  test("by default, number of events is listed as 32", async () => {
    render(
      <NumberOfEvents
        eventNumber={32}
        onEventNumberChange={func}
        setErrorAlert={func}
      />
    );
    const numberTextBox = screen.getByPlaceholderText("Enter a Number");
    expect(numberTextBox).toHaveValue("32");
  });

  test("user can change number of events they wish to see listed", async () => {
    render(
      <NumberOfEvents
        eventNumber={32}
        onEventNumberChange={func}
        setErrorAlert={func}
      />
    );
    const numberTextBox = screen.getByPlaceholderText("Enter a Number");
    await userEvent.type(numberTextBox, "10");
    expect(func).toHaveBeenCalled();
  });
});

describe('<NumberofEvents /> integration', () => {
    test('renders specific number of events when the app is rendered', async () => {
        render(<App />);
        const numberOfEvents = screen.getByTestId('number-of-events');
        const numberTextBox = within(numberOfEvents).getByRole('textbox');
        await userEvent.type(numberTextBox, "10");
        await screen.findAllByRole('listitem');
        const eventListItems = screen.queryAllByRole('listitem');
        expect(eventListItems.length).toBe(10)
    });
});
