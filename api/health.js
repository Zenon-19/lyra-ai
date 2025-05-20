// API handler using serverless functions approach
export default function handler(request, response) {
  response.status(200).json({
    message: 'Lyra API is running!',
    status: 'healthy'
  });
}
