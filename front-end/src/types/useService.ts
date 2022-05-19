import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { IPatientData } from './Patient';

export interface Data {
  results: IPatientData[];
}

const usePostStarshipService = () => {
  const [result, setResult] = useState<Service<Data>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/patients')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default usePostStarshipService;