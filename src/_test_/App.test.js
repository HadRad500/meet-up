import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from '../api';
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("renders textbox with number of events", () => {
    // render(<App />);
    expect(AppDOM.querySelector("#numberOfEvents")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

        await user.type(CitySearchInput, 'Berlin');
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector('#event-list');
        console.log(Object.keys(EventListDOM)) 
/*         console.log(Object.keys(EventListDOM['__reactProps$vjrzr22ft8'])) 
 */
        let allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
        allRenderedEventItems = allRenderedEventItems.filter(
            event => event.textContent.includes('Berlin, Germany')
        );
        const allEvents = await getEvents();
       
        const berlinEvents = allEvents.filter(
            event => event.location === 'Berlin, Germany'
        );
        
         expect(allRenderedEventItems.length).toBe(berlinEvents.length);
 
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain('Berlin, Germany');
        });
    });
});
