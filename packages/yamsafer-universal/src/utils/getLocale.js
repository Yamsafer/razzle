export default function(req) {
  return /\/en\/|\/en$/.test(req.path) ? 'en' : 'ar';
}
