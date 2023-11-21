Feature: Specify number of events

 Scenario: When user hasn’t specified a number, 32 is the default number
  Given the user has not specified a number of events to be listed at a time, 
  When the user views the event list 
  Then it will display 32 events at a time.
  
 Scenario: User can change the number of events they want to see
  Given the user wants to change the number of events shown at a time,
  When they enter a new number in the input field
  Then the event list will update to display the specified number of events.