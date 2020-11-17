import React from "react";

const CreatePoll = () => {
  return (
    <div className="polls">
      <form>
        <label>Naziv ankete</label>
        <input type="text" placeholder="radna subota"/> 

        <span>1.1.1970.</span>
        <span>00:00:00</span>
        <label for="cars">Choose a restaurant:</label>

        {/* Ljubica */}

        <input type="submit" />

      </form>
    </div>
  );
};

export default CreatePoll;
