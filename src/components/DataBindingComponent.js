import React, { useState, useEffect } from "react";

export default function DataBandingComponent() {
  const [mars, setMars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setMars(data.photos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading</div>;
  }

  if (error) {
    return <div className="container">{error.message}</div>;
  }

  return (
    <div className="container">
      <h2>API Data</h2>
      <div className="row">
        {mars.map((photo) => (
          <div className="col-md-4" key={photo.id}>
            <div className="card mb-4">
              <img src={photo.img_src} className="card-img-top" width={50} height={400} alt={`Mars Rover ${photo.rover.name}`} />
              <div className="card-body">
                <h5 className="card-title">{photo.camera.full_name}</h5>
                <p className="card-text">
                  <strong>Rover:</strong> {photo.rover.name}
                  <br />
                  <strong>Earth Date:</strong> {photo.earth_date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
