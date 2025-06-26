// controllers/eventController.js
import Event from '../models/Event.js';

// Get all events (with optional filters)
export const getAllEvents = async (req, res) => {
  try {
    const { published, search } = req.query;
    let query = {};
    
    // Filter by published status
    if (published !== undefined) {
      query.published = published === 'true';
    }
    
    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const events = await Event.find(query)
      .sort({ date: 1 }); // Sort by date ascending
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

// Create new event
// export const createEvent = async (req, res) => {
//   try {
//     const event = new Event(req.body);
//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     console.error('Error creating event:', error);
//     res.status(400).json({ message: error.message });
//   }
// };
// controllers/eventController.js
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, redirectUrl, ...otherFields } = req.body;

    // Validate required fields
    if (!title || !description || !date || !location || !redirectUrl) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields: [
          !title ? 'title' : null,
          !description ? 'description' : null,
          !date ? 'date' : null,
          !location ? 'location' : null,
          !redirectUrl ? 'redirectUrl' : null
        ].filter(Boolean)
      });
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      redirectUrl,
      ...otherFields
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

// Toggle publish status
export const togglePublish = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    event.published = !event.published;
    await event.save();
    
    res.json(event);
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({ message: 'Failed to toggle publish status' });
  }
};
