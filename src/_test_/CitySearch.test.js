import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extractLocations } from "../api";
import CitySearch from "../components/CitySearch";
import mockData from "../mock-data";

const allEvents = mockData;
const allLocations = extractLocations(allEvents);

describe("<CitySearch /> component", () => {
  test("renders text input", () => {
    render(<CitySearch />);
    const cityTextBox = screen.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch />);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = screen.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    render(<CitySearch allLocations={allLocations} />);

    //User types "Berlin" in searchbox
    const cityTextBox = screen.queryByRole("textbox");
    await userEvent.type(cityTextBox, "Berlin");

    //Filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    //get all <li> elements inside the suggestion list
    const suggestionListItems = screen.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    render(<CitySearch allLocations={allLocations} />);
    const user = userEvent.setup();

    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = screen.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
