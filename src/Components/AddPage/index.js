import { useState } from "react";

const AddEvent = () => {
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
  });

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
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="title">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full border p-2"
          />
        </div>

        {/* Organization */}
        <div>
          <label className="block font-semibold">Organization:</label>
          <input 
            type="text" 
            name="organization" 
            value={formData.organization} 
            onChange={handleChange} 
            className="w-full border p-2"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block font-semibold">Availability:</label>
          <input 
            type="number" 
            name="availability" 
            value={formData.availability} 
            onChange={handleChange} 
            className="w-full border p-2"
            placeholder="Max people"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-semibold">Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className="w-full border p-2"
          />
        </div>
        <div>
          <input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
            className="w-full border p-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold">Location:</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            className="w-full border p-2"
            placeholder="Address"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold">Tags:</label>
          <input 
            type="text" 
            name="tags" 
            value={formData.tags} 
            onChange={handleChange} 
            className="w-full border p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="w-full border p-2 h-24"
            placeholder="Description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border" />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Create Event
        </button>

      </form>
    </div>
  );
};

export default AddEvent;
