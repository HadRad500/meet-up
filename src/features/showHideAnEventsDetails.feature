Feature: Show/hide an event's details

 Scenario: An Event element is collapsed by default
  Given the user has selected a location to search for events,
  When the list of local events for that location loads
  Then the event elements will collapse.

 Scenario: User can expand an event to see its details
  Given the list of events is displayed,
  When the user clicks on show details
  Then the event details will be displayed.

 Scenario: User can collapse an event to hide its details
  Given the user has all the information they need about an event,
  When the user clicks hide details
  Then the event details will be hidden.