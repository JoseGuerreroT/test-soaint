import { useEffect, useState } from 'react';

const FetchGithub = () => {
  const [data, setData] = useState({
    name: '',
    location: ''
  })

  useEffect(() => {
    fetch('https://api.github.com/users/workshopsjsmvd')
      .then(res => res.json()).then(res => {
        setData({
          name: res.name,
          location: res.location
        })
      });
  }, [])

  return [
    <h1 key="name">{`Nombre: ${data.name}`}</h1>,
    <h2 key="location">{`País: ${data.location}`}</h2>
  ];

};


export default FetchGithub;