// app/influencer/[name]/page.tsx
interface InfluencerPageProps {
    params: {
      name: string;
    };
  }
  
  export default async function InfluencerPage({ params: { name } }: InfluencerPageProps) {
    // Decode URL encoding and replace hyphens with spaces
    const formattedName = decodeURIComponent(name).replace(/-/g, " ");
    
    // Update the path to point to the public/images folder in the root
    const imageUrl = `/images/${encodeURIComponent(formattedName)}.jpg`;
  
    return (
      <div className="p-8 mt-20">
        {/* Influencer name displayed front and center */}
        <h1 className="text-7xl font-bold text-center mb-12">{formattedName}</h1>
        
        {/* Profile image */}
        <div className="flex justify-center mb-12">
          <img
            src={imageUrl}
            alt={`Profile image of ${formattedName}`}
            className="w-80 h-80 object-cover rounded-full"
          />
        </div>
        
        {/* Question and buttons */}
        <div className="text-center">
          <p className="text-2xl mb-6">Do you think that {formattedName} will...</p>
          <div className="flex justify-center space-x-8 mb-6">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4 px-12 text-xl rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              rise
            </button>
            <button className="bg-gradient-to-r from-red-400 to-red-600 text-white py-4 px-12 text-xl rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              fall
            </button>
          </div>
          <p className="text-2xl">... in popularity this month.</p>
        </div>
      </div>
    );
  }
  