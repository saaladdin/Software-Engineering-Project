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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ 
        ...formData, 
        image: file, 
        imagePreview: URL.createObjectURL(file) 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    navigate("/dashboard", { state: { event: formData } });
  };

  return (
    <div className="addevent">
      <div className="addevent_form">
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
            <input type="file" accept="image/*" onChange={handleImageUpload} className="submit_image" />
          </div>

          <button
            type="submit" 
            className = "button"
          >
            Submit Event
          </button>
        </form>
      </div>

      <div className="preview">
      <h2>Event Preview</h2>
        {formData.imagePreview && <img src={formData.imagePreview} alt="Event" className="previewimage" />}
        <h3>{formData.title}</h3>
        <p><strong>Organization:</strong> {formData.organization}</p>
        <p><strong>Date:</strong> {formData.date} {formData.time}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p>{formData.description}</p>
      </div>
    </div>
  );
};

export default AddEvent;