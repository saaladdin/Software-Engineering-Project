import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.scss";

const CreateEvent = ({ addEvent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    location: "",
    image: "",
    description: "",
    organization: "",
    startTime: "",
    endTime: "",
    tags: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file){
        setFormData((prevData) => ({
            ...prevData,
            image: URL.createObjectURL(file),
        }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    addEvent(newEvent);
    navigate("/dashboard");
  };

  return (
    <div className="create-event-container">
      <div className="create-event">
        <h2>Create a New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Organization:
            <select
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            >
              <option value="">Select an Organization</option>
              <option value="One Piece Club">One Piece Club</option>
              <option value="Colorful Stage">Colorful Stage</option>
              <option value="Pokemon League">Pokemon League</option>
              <option value="Food Club">Food Club</option>
              <option value="Host Club">Host Club</option>
              <option value="Charity Club">Charity Club</option>
              <option value="Astronomy Club">Astronomy Club</option>
              <option value="Robotics Club">Robotics Club</option>
              <option value="Soccer Club">Soccer Club</option>
              <option value="Math Club">Math Club</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tags:
            <select name="tags" value={formData.tags} onChange={handleChange}>
              <option value="">Select Tags</option>
              <option value="free-food">free-food</option>
              <option value="free-stuff">free-stuff</option>
            </select>
          </label>

          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
          <button type="submit" className="submit-btn">
            Create Event
          </button>
        </form>
      </div>

      <div className="preview">
        <h2>Event Preview</h2>
        <h3>{formData.title}</h3>
        <p>
          <strong>Organization:</strong> {formData.organization}
        </p>
        <p>
          <strong>Date:</strong> {formData.startTime} - {formData.endTime}
        </p>
        <p>
          <strong>Location:</strong> {formData.location}
        </p>
        <p>
          <strong>Tags:</strong> {formData.tags}
        </p>
        <p>{formData.description}</p>
        {formData.image && <img src={formData.image} alt="Event" />}
      </div>
    </div>
  );
};

export default CreateEvent;
