import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { ImCancelCircle } from "react-icons/im";
function MainPage() {
	const [userDetails, setUserDetails] = useState([]);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [newValue, setNewValue] = useState(false);
	const [formData, setFormData] = useState({
		id: "",
		name: "",
	});

	const [updateValue, setUpdateValue] = useState({
		updateID: "",
		updateName: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target; // Destructure the input's name and value
		setFormData((prevState) => ({
			...prevState,
			[name]: value, // Update the corresponding field in state
		}));
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/api/v1/getUsers"
				);
				if (response) {
					console.log(response.data);
					setUserDetails(response.data);
				} // Handle the response data here
			} catch (error) {
				console.error("Error fetching data:", error); // Handle the error
			}
		};

		fetchData();
	}, [newValue]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		const response = await axios.post(
			"http://localhost:8080/api/v1/addUser",
			formData
		);
		if (response) {
			console.log(response.data);
			setNewValue(!newValue);
			alert("SUCESSFULLY ADDED");
		}
	};

	const handleUpdate = async (id, name) => {
		setUpdateVisible(true);

		setUpdateValue((prevState) => ({
			...prevState,
			updateID: id,
			updateName: name,
		}));
	};

	const handleUpdateChange = (e) => {
		const { name, value } = e.target;

		setUpdateValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
	
		const payload ={
			id:updateValue["updateID"],
			name:updateValue["updateName"]
		}
		console.log(payload);
		try {
			const response = await axios.put(
				"http://localhost:8080/api/v1/updateUser",
				payload
			);
			if (response) {
				console.log(response.data);
				alert("User updated successfully!");
				setNewValue(!newValue);
			}
		} catch (error) {
			console.error("Error updating user:", error);
			alert("Failed to update user.");
		}
	};
	// const delteUser = async (id,name) => {
	// 	const payload ={
	// 		id:id,
	// 		name:name
	// 	}
	// 	try {
	// 		const response = await axios.delete(
	// 			"http://localhost:8080/api/v1/deleteUser",
	// 			{data:payload}
	// 		);
	// 		if (response) {
	// 			console.log(response);
	// 			setNewValue(!newValue)
	// 			alert("User deleted successfully!");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const delteUser = async (id,name) => {
		const payload ={
			id:id,
			name:name
		}
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/v1/deleteUser/${id}`
				
			);
			if (response) {
				console.log(response);
				setNewValue(!newValue)
				alert("User deleted successfully!");
			}
		} catch (error) {
			console.log(error);
		}
	};
	console.log(newValue);
	return (
		<div>
			<div
				className={`${
					updateVisible
						? "absolute w-full h-screen overflow-hidden bg-gray-800 top-0 z-10 opacity-65"
						: "hidden"
				}`}></div>

			<div
				className={`${
					updateVisible
						? " absolute w-[600px] h-[300px] overflow-hidden bg-white left-[35%] top-[30%] z-50"
						: "hidden"
				}`}>
				<div className="w-full  h-8 items-center justify-end flex text-2xl pr-1">
					<ImCancelCircle
						className="text-red-600 cursor-pointer"
						onClick={() => {
							setUpdateVisible(false);
						}}
					/>
				</div>

				<div className="w-full h-full ">
					<h1 className="w-full text-center text-2xl uppercase font-semibold">
						update user details
					</h1>
					<div className="w-[90%] mx-auto h-32 ">
						<form
							action=""
							className="w-full h-full"
							onSubmit={handleUpdateSubmit}>
							<div className="flex  w-full h-full gap-x-2 items-center justify-center">
								<input
									type="Number"
									className=" pl-2 text-lg rounded-md w-2/5 h-12 border border-black outline-none"
									name="updateID"
									id="updateID"
									value={updateValue["updateID"]}
									onChange={handleUpdateChange}
								/>
								<input
									type="text"
									className="w-3/5 h-12 pl-2 text-lg border rounded-md border-black outline-none"
									name="updateName"
									id="updateName"
									value={updateValue["updateName"]}
									onChange={handleUpdateChange}
								/>
							</div>
							<div className="w-full flex justify-center">
								<input
									type="submit"
									className=" cursor-pointer text-white font-bold w-28 h-12 bg-blue-500 rounded-md text-lg"
									value="UPDATE"
									name=""
									id=""
								/>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div
				className={`${updateVisible}?"hidden":}" w-full bg-white flex items-center justify-center mt-1 p-1 h-20 fixed top-0 z-10"`}>
				<h1 className="text-4xl font-bold uppercase">user mangement System</h1>
			</div>

			<div className="w-[100%] flex mx-auto  h-screen  pt-8 gap-x-2 bg-[#b9b9b9]">
				<div className="w-1/5 bg-gray-100 h-[300px] mt-20 py-4 flex flex-col items-center justify-center shadow-md shadow-gray-500 rounded-md ml-4 ">
					<p className="text-2xl uppercase font-bold">ADD new user</p>
					<div className="w-full mt-4">
						<form action="" onSubmit={handleSubmit} className="w-[90%] mx-auto">
							<div className="flex gap-x-3">
								<input
									type="Number"
									placeholder="ID"
									name="id"
									id="id"
									onChange={handleChange}
									className="w-2/5 pl-1 border border-black outline-none rounded-md text-gray-900"
								/>
								<input
									type="text"
									placeholder="Name"
									className="w-4/5 border border-black outline-none  rounded-md h-12 px-1 text-gray-900"
									name="name"
									id="name"
									onChange={handleChange}
								/>
							</div>
							<div className="w-full flex items-center justify-center">
								<input
									type="submit"
									value="ADD"
									className="w-28 rounded-md text-white font-semibold bg-blue-500 mt-4  text-center flex items-center justify-center cursor-pointer py-2"
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 px-2">
  {userDetails.map((user, index) => (
    <div
      key={index}
      className="bg-white shadow-md shadow-gray-500 h-[120px] flex items-center justify-center rounded-md flex-col"
    >
      {/* User Info Section */}
      <div className="w-full py-2 flex items-center justify-start gap-x-12 h-20">
        {/* User Initial Circle */}
        <div className="w-1/5 p-2">
          <p className="w-20 rounded-full h-20 bg-gray-500 flex items-center justify-center text-2xl text-white">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "?".charAt(0).toUpperCase()}
          </p>
        </div>
        {/* User Details */}
        <div className="flex flex-col pl-2 w-3/5 h-full text-black">
          <p className="text-2xl font-semibold">
            {user.name ? user.name : "Unknown"}
          </p>
          <p className="text-base pl-1">id: {user.id}</p>
        </div>
      </div>
      {/* Action Buttons Section */}
      <div className="w-full flex h-10 items-center justify-end text-xl gap-x-2 pr-1">
        <div
          onClick={() => {
            handleUpdate(user.id, user.name);
          }}
          className="border cursor-pointer border-black rounded-md p-2"
        >
          <FaEdit />
        </div>
        <div
          onClick={() => {
            delteUser(user.id, user.name);
          }}
          className="border cursor-pointer border-black rounded-md p-2"
        >
          <ImBin />
        </div>
      </div>
    </div>
  ))}
</div>

			</div>
		</div>
	);
}

export default MainPage;
