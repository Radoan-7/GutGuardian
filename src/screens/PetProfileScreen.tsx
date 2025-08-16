import React, { useState } from 'react';
import { Pet } from '../types';
import { Avatar } from '../components/Avatar';
import { ParticleBackground } from '../components/ParticleBackground';

interface PetProfileScreenProps {
  onComplete: (pet: Pet) => void;
}

export const PetProfileScreen: React.FC<PetProfileScreenProps> = ({ onComplete }) => {
  const [petData, setPetData] = useState({
    name: '',
    species: '' as 'dog' | 'cat' | '',
    breed: '',
    age: '',
    weight: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setPetData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!petData.name.trim()) newErrors.name = 'Pet name is required';
    if (!petData.species) newErrors.species = 'Please select a species';
    if (!petData.breed.trim()) newErrors.breed = 'Breed is required';
    if (!petData.age || parseInt(petData.age) <= 0) newErrors.age = 'Valid age is required';
    if (!petData.weight || parseFloat(petData.weight) <= 0) newErrors.weight = 'Valid weight is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const pet: Pet = {
      id: Date.now().toString(),
      name: petData.name.trim(),
      species: petData.species as 'dog' | 'cat',
      breed: petData.breed.trim(),
      age: parseInt(petData.age),
      weight: parseFloat(petData.weight),
      createdAt: new Date()
    };

    onComplete(pet);
  };

  const isFormComplete = petData.name && petData.species && petData.breed && petData.age && petData.weight;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Meet Your Pet
            </h2>
            <p className="text-gray-600">Let's create your pet's profile</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <Avatar 
              pet={petData.name && petData.species ? { name: petData.name, species: petData.species } : null}
              size="large" 
              className={isFormComplete ? 'animate-bounce' : ''}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pet Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                value={petData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-purple-500'
                }`}
                placeholder="Enter your pet's name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Species */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species *
              </label>
              <select
                value={petData.species}
                onChange={(e) => handleInputChange('species', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  errors.species 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-purple-500'
                }`}
              >
                <option value="">Select species</option>
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐱 Cat</option>
              </select>
              {errors.species && <p className="text-red-500 text-sm mt-1">{errors.species}</p>}
            </div>

            {/* Breed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breed *
              </label>
              <input
                type="text"
                value={petData.breed}
                onChange={(e) => handleInputChange('breed', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  errors.breed 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-purple-500'
                }`}
                placeholder="e.g., Golden Retriever, Persian"
              />
              {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
            </div>

            {/* Age and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={petData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    errors.age 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (lbs) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={petData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    errors.weight 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500'
                  }`}
                  placeholder="Weight"
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 ${
                isFormComplete
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg animate-pulse'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormComplete}
            >
              {isFormComplete ? '🎉 Create Profile' : 'Complete All Fields'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};