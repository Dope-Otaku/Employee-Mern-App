import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedCourses = [...employee.course];

    if (checked) {
      updatedCourses.push(name);
    } else {
      updatedCourses = updatedCourses.filter((course) => course !== name);
    }

    setEmployee({ ...employee, course: updatedCourses });
  };

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in employee) {
        formData.append(key, employee[key]);
      }
      const response = await axios.post("/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
      console.log(response.data.message);
    } catch (error) {
      setError("Failed to add employee. Please try again later.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Mobile No:
        <input
          type="tel"
          name="mobile"
          pattern="[0-9]{10}"
          value={employee.mobile}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Designation:
        <select
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </label>
      <label>
        Gender:
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={employee.gender === "M"}
            onChange={handleChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={employee.gender === "F"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
      </label>
      <label>
        Course:
        <label>
          <input
            type="checkbox"
            name="MCA"
            checked={employee.course.includes("MCA")}
            onChange={handleCheckboxChange}
          />{" "}
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BCA"
            checked={employee.course.includes("BCA")}
            onChange={handleCheckboxChange}
          />{" "}
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BSC"
            checked={employee.course.includes("BSC")}
            onChange={handleCheckboxChange}
          />{" "}
          BSC
        </label>
      </label>
      <label>
        Img Upload:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Submit</button>
      <button type="button" onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </form>
  );
};

export default CreateEmployee;
