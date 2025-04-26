import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Incident from './models/incidentModel.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://gouravsittam:BixBie2C7oFv2j4Z@devspark.yx5wf.mongodb.net/humanchain')
  .then(() => console.log('MongoDB Connected for seeding...'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Sample incident data
const incidents = [
  {
    title: 'Unintended Bias in Language Model Output',
    description: 'An AI language model produced outputs containing gender and racial biases when responding to certain prompts, potentially reinforcing harmful stereotypes. The model was deployed in a customer service application.',
    severity: 'High',
    reported_at: new Date('2025-03-15T09:30:00Z')
  },
  {
    title: 'Data Privacy Breach in Recommendation System',
    description: 'AI recommendation system inadvertently revealed private user information through pattern analysis that could be reverse-engineered. The issue was discovered during internal review before widespread impact.',
    severity: 'Medium',
    reported_at: new Date('2025-03-20T14:45:00Z')
  },
  {
    title: 'Resource Consumption Anomaly',
    description: 'AI system entered an unexpected optimization loop causing excessive server resource usage. No data was compromised but the incident highlighted potential vulnerabilities in resource allocation constraints.',
    severity: 'Low',
    reported_at: new Date('2025-03-25T11:15:00Z')
  }
];

// Seed function
const seedDB = async () => {
  try {
    // Clear existing data
    await Incident.deleteMany({});
    console.log('Existing incidents removed');
    
    // Insert sample data
    const seededIncidents = await Incident.insertMany(incidents);
    console.log(`${seededIncidents.length} incidents successfully seeded`);
    
    // Close connection
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB();