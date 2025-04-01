import { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    availability: "",
    date: "",
    time: "",
    location: "",
    tags: "",
    description: "",
    image: null,
  }
);

const handleCreateEvent = () => {
  // Your event creation logic here
  navigate("/dashboard");
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="addevent">
      <h2 className="pagename">Create Event</h2>
      <form onSubmit={handleSubmit} className="form">
        
        {/* Title */}
        <div>
          <label className="title">Title:</label>
          <input 
            type="text"
            name="title"
            value={formData.title} 
            onChange={handleChange} 
            className="insert_title"
          />
        </div>

        {/* Organization */}
        <div>
          <label className="organization">Organization:</label>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="insert_organization"
          >
            <option value="">Select an Organization</option>
            <option value="org1">One Piece Club</option>
            <option value="org2">Colorful Stage</option>
            <option value="org3">Pokemon League</option>
            <option value="org4">Food Club</option>
            <option value="org5">Host Club</option>
            <option value="org6">Charity Club</option>
            <option value="org7">Astronomy Club</option>
            <option value="org8">Robotics Club</option>
            <option value="org9">Soccer Club</option>
            <option value="org10">Math Club</option>

            {/* Add more options as needed */}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="available">Availability:</label>
          <input 
            type="number" 
            name="availability"
            value={formData.availability} 
            onChange={handleChange} 
            className="max_people"
            placeholder="Max people"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="time_date">Date:</label>
          <input 
            type="date" 
            name="date"
            value={formData.date} 
            onChange={handleChange} 
            className="date"
          />
        </div>

        <div>
          <input 
            type="time" 
            name="time"
            value={formData.time} 
            onChange={handleChange} 
            className="time"
          />
        </div>

        {/* Location */}
        <div>
          <label className="location">Location:</label>
          <input 
            type="text" 
            name="location"
            value={formData.location} 
            onChange={handleChange} 
            className="insert_location"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="tags">Tags:</label>
          <input 
            type="text" 
            name="tag"
            value={formData.tags} 
            onChange={handleChange} 
            className="insert_tags"
          />
        </div>

        {/* Description */}
        <div>
          <label className="description">Description:</label>
          <textarea 
            name="description"
            value={formData.description} 
            onChange={handleChange} 
            className="insert_description"
            placeholder="Description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="image">Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="img" />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="button"
          onClick={handleCreateEvent}
        >
          Create Event
        </button>

      </form>
    </div>
  );
};

export default AddEvent;
