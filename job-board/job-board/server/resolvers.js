import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (root, { id } ) => Job.findById(id),
        jobs : () => Job.findAll(),
    },

    Job: {
        company: (job) =>  Company.findById(job.companyId)
    }
}