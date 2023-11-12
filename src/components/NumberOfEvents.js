import React from "react";

const NumberOfEvents = ({
    eventNumber,
    onEventNumberChange,
    setErrorAlert,
}) => {
    const handleInputChanged = (value) => {
        const numberValue = parseInt(value);
        if (!isNaN(numberValue)) {
            onEventNumberChange(numberValue);
        } else {
            onEventNumberChange(32);
        }
        let errorText;
        if (isNaN(value) || value <= 0) {
            errorText = 'Enter positive number to contiune';
        } else {
            errorText = '';
        }
        setErrorAlert(errorText);
    };

    return (
        <div data-testid="number-of-events">
            <input
            onFocus={() => {
                onEventNumberChange('');
            }}
            type='text'
            className='textbox'
            placeholder='Enter a Number'
            value={eventNumber}
            onChange={(e) => handleInputChanged(e.target.value)}
            />
        </div>
    );
};

export default NumberOfEvents;