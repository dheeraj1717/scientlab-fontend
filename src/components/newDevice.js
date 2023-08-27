import React from "react";
import DataTable from "react-data-table-component";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";

const NewDevice = () => {
  const devices = useSelector((state) => state.devices.devices);
  const dispatch = useDispatch();

  const customStyles = {
    title: {
      style: {
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "#3982d7",
        color: "white",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  };
  const columns = [
    { name: "Location", selector: "location", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    { name: "Latitude", selector: "latitude", sortable: true },
    { name: "Longitude", selector: "longitude", sortable: true },

    {
      name: "Active",
      cell: (row) => (
        <Switch checked={row.active} onChange={() => handleToggle(row)} />
      ),
    },
  ];

  const handleToggle = (row) => {
    dispatch();
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="font-bold text-[1.5rem] mb-4">Device Information</h2>
      <DataTable
        columns={columns}
        data={devices}
        customStyles={customStyles}
        pagination
        fixedHeader
        striped
      />
    </div>
  );
};

export default NewDevice;
