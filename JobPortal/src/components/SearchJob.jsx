import axios from '../lib/axios'
import { useState } from 'react';
function Search() {
  const [searchTerm, setSearchTerm] = useState({
    title: '',
    category: '',
    location: '',
  });
  const [jobData, setData]= useState([""])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };
console.log(searchTerm.title)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/search', {
        name:searchTerm.title,
        category:searchTerm.category,
        location:searchTerm.location
      });
      // Handle the response data here, e.g., update state or display results
      const oyo=response.data
      setData(oyo)
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., display error messages
    }
  };
  return (<>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={searchTerm.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={searchTerm.category}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={searchTerm.location}
        onChange={handleChange}
      />
      <button type="submit">Search</button>

    </form>
    <div className="flex flex-col items-center justify-center w-2/3 p-8">
            

            {/* Render fetched job data */}
            
           <div className="grid grid-cols-2 gap-12 w-4/5">
              {jobData.length > 0 ? (
                jobData.map((job) => (
                  <div
                    key={job.id}
                    className="h-auto border p-8 rounded-lg shadow-md bg-gray-200 flex flex-col"
                  >
                    <h3 className="font-bold text-xl mb-2">{job.name}</h3>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <p className="text-gray-500">
                      <span className="font-semibold">Category:</span>{" "}
                      {job.category}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-semibold">Location:</span>{" "}
                      {job.location}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-600">
                  No job data available.
                </div>
              )}
            </div> 
          </div>

  </>);
}

export default Search;


