import React, { useEffect, useState } from 'react';
import { config } from '../config/config';


const useLocationCheck = () => {
    const [location, setLocation] = useState(null);
    const [exactLocation, setExactLocation] = useState(null);
    

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { longitude, latitude } = position.coords;
                        setLocation({ longitude, latitude });
                        localStorage.setItem("locationcords",JSON.stringify({longitude,latitude}))

                        // You can fetch the exact location here using the coordinates
                        let datax=JSON.parse(localStorage.getItem("locationcords"));
                        
                        if(datax[0]!==longitude || datax[1]!==latitude)
                        {
                           
                            const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${config.reversegeocode_id}&radius=100`);
                            const data = await response.json();
                            setExactLocation(data);
                        }
                        
                    });
                } else {
                    alert("GeoLocation is not supported");
                }
            } catch (error) {
                console.log("Unable to fetch coords", error);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        console.log(location); 
    }, [location]); 

    return { exactLocation };
};

export default useLocationCheck;
