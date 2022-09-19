import JobList from './JobList';
import { getJobs } from './graphQL/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [ jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  console.log('[jobBoard] jobs:', jobs)
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
