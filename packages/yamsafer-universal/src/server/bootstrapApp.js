export default async function bootstrapApp(context) {
  const { store, bootstrap } = context;
  bootstrap(context);
  return context;
}
