import createMemoryHistory from 'history/createMemoryHistory';

export default function(req, res) {
  return Object.assign(
    {},
    createMemoryHistory({
      initialEntries: [req.url],
    }),
    {
      redirect(to) {
        return res.redirect(to);
      },
    }
  );
}
