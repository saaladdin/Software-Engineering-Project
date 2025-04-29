import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../CreateEvent/CreateEvent.scss';
const EditEvent = ({ events, updateEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const eventToEdit = events.find((event) => event.id === parseInt(id));
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    organization: "",
    description: "",
    startTime: "",
    endTime: "",
    tags: [],
    image: "",
    groupIcon: "",
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
        tags: Array.isArray(eventToEdit.tags)
          ? eventToEdit.tags
          : [eventToEdit.tags],
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData((prev) => ({ ...prev, tags: [value] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleGroupIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        groupIcon: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...formData,
      tags: formData.tags.map((tag) => tag.trim()),
    };
    updateEvent(updatedEvent);
    navigate("/dashboard");
  };

  if (!eventToEdit) return <p>Event not found.</p>;

  return (
    <div className="create-event-container">
      <div className="create-event">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Same fields as CreateEvent */}
          <label>
            Title:
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
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
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </label>
          <label>
            Tags:
            <select
              name="tags"
              value={formData.tags[0] || ""}
              onChange={handleChange}
            >
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
          <label>
            Group Icon:
            <input
              type="file"
              name="groupIcon"
              onChange={handleGroupIconChange}
              accept="image/*"
            />
          </label>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
