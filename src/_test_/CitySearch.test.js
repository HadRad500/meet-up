import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";
import CitySearch from "../components/CitySearch";
import App from "../App";
import mockData from "../mock-data";

const func = jest.fn();
describe("<CitySearch /> component", () => {
  /* let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch
      allLocations={[]}
      setCurrentCity={() => { }}
      setInfoAlert={() => { }}
    />);
  }); */

  test("renders text input", () => {
    render(<CitySearch setSelectedCity={func} />);
    const cityTextBox = screen.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch setSelectedCity={func} />);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    render(<CitySearch allLocations={[]} setSelectedCity={func} />);
    const user = userEvent.setup();
    const cityTextBox = screen.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setSelectedCity={func} />);

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
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setSelectedCity={func} />);
    const user = userEvent.setup();
    

    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = screen.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});
