import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
//import { companies } from '../fake-data';
import { getCompany } from './graphQL/queries'
import JobList from './JobList';

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();
  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company){
    return <p>Loading....</p>;
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs}/>
    </div>
  );
}

export default CompanyDetail;
