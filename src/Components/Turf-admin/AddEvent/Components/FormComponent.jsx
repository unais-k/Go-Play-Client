import React from "react";
import LabelCheckbox from "./LabelCheckbox";

function FormComponent({ handleInputChange, handleSubmit, handleCheckboxSport }) {
    const size = [
        { name: "5 * 5" },
        { name: "6 * 6" },
        { name: "7 * 7" },
        { name: "8 * 8" },
        { name: "10 * 10" },
        { name: "11 * 11" },
    ];

    const type = [{ name: "Turf" }, { name: "Soapy" }, { name: "Grass" }, { name: "Sand" }, { name: "Court" }];
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 max-w-xl m-auto">
                <div className="col-span-2">
                    <input
                        type="groundName"
                        name="groundName"
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ground name"
                    />
                </div>
                <LabelCheckbox handleCheckboxSport={handleCheckboxSport} />

                <div className="col-span-2">
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="text"
                        onChange={handleInputChange}
                        name="type"
                    >
                        <option value="">Choose type</option>
                        {type.map((obj, index) => {
                            return (
                                <option key={index + Math.round(Math.random) * 124} value={obj.name}>
                                    {obj.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="col-span-2">
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="text"
                        onChange={handleInputChange}
                        name="size"
                    >
                        <option value="">Choose size</option>
                        {size.map((obj, index) => {
                            return (
                                <option key={index + Math.round(Math.random) * 124} value={obj.name}>
                                    {obj.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <input
                        type="price"
                        name="price"
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Price"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <input
                        type="priceAtNight"
                        onChange={handleInputChange}
                        name="priceAtNight"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Price at night"
                    />
                </div>
                <div className="text-lime-500 text-sm">Submit for Time manage</div>

                <div className="col-span-2 text-right">
                    <button className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FormComponent;
