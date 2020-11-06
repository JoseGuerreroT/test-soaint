import { Fragment } from 'react';
import useDataApi from './services';

const FetchGithub = () => {
  const { data, loading } = useDataApi(`users/workshopsjsmvd`)

  if (loading) return <h2 key="name">Cargando datos...</h2>

  return <Fragment>
    <h1 key="name">{`Nombre: ${data?.name}`}</h1>,
    <h2 key="location">{`País: ${data?.location}`}</h2>
  </Fragment>;

};


export default FetchGithub;