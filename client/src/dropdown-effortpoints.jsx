import React, { useState } from 'react';

const CreateEffortPointsDropDown = ({ effortPointOptions, selectedEffortPoints, setSelectedEffortPoints }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedEffortPoints ? selectedEffortPoints : 'Select Effort Points'}
        </button>
        {showDropdown && (
          <div className="modal-container" onClick={() => setShowDropdown(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-options">
                {effortPointOptions.map((option) => (
                  <button
                    key={option}
                    className="dropdown-option"
                    onClick={() => {
                      setSelectedEffortPoints(option);
                      setShowDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateEffortPointsDropDown;
