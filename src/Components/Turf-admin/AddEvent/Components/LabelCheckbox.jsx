import React from "react";

function LabelCheckbox({ handleCheckboxSport }) {
    return (
        <div className="col-span-2">
            <ul className="flex justify-between">
                <li className="me-2">
                    <label className="">
                        football
                        <input className="ms-2" type="checkbox" onClick={handleCheckboxSport} value="Football" />
                    </label>
                </li>
                <li className="me-2">
                    <label className="">
                        cricket
                        <input className="ms-2" type="checkbox" value="Cricket" onClick={handleCheckboxSport} />
                    </label>
                </li>
                <li className="me-2">
                    <label className="">
                        volleyball
                        <input className="ms-2" type="checkbox" value="Volley ball" onClick={handleCheckboxSport} />
                    </label>
                </li>
                <li className="me-2">
                    <label className="">
                        tennis
                        <input className="ms-2" type="checkbox" value="Tennis" onClick={handleCheckboxSport} />
                    </label>
                </li>
                <li className="me-2">
                    <label className="">
                        badminton
                        <input className="ms-2" type="checkbox" value="Badminton" onClick={handleCheckboxSport} />
                    </label>
                </li>
                <li className="me-2">
                    <label className="">
                        basketball
                        <input className="ms-2" type="checkbox" value="Basket ball" onClick={handleCheckboxSport} />
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default LabelCheckbox;
