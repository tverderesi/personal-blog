export const config = {
  runtime: 'serverless',
};


export default function handler(request, response) {
  response.status(200).send('Hello World!');
}
