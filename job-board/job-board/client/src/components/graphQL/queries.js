import {request, gql} from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
    const query = gql`
    query {
            jobs{
              id
              title
              description
              company {
                id
                name
              }
            }
    }
    `;
    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs
}

export async function getJob( id ) {
    const query = gql`
    query ($id: ID!){
            jobs(id: $id){
              id
              title
              description
              company {
                id
                name
              }
            }
    }
    `;
    const variables = { id }
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job
}