import mongoose from 'mongoose';

const talkFormSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide the company name'],
    minlength: 3,
  },
  address: {
    type: String,
    required: [true, 'Please provide the address'],
    minlength: 5,
  },
  country: {
    type: String,
    required: [true, 'Please select a country'],
  },
  project: {
    type: String,
    required: [true, 'Please select a project'],
  },
  additional: {
    type: String,
    required: [true, 'Please provide additional information'],
    minlength: 5,
  },
  responsibilities: {
    type: String,
    required: [true, 'Please provide responsibilities'],
    minlength: 10,
  },
  vacancy: {
    type: Number,
    required: [true, 'Please provide the number of vacancies'],
    min: 1,
  },
  softwareSkill: {
    type: String,
    required: [true, 'Please provide the software skills'],
    minlength: 3,
  },
  skillRequirement: {
    type: String,
    required: [true, 'Please provide the skill requirements'],
    minlength: 3,
  },
});

const TalkForm =
  mongoose.models.talkForm || mongoose.model('talkForm', talkFormSchema);

export default TalkForm;
