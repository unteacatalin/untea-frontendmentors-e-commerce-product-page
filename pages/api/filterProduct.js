import DataStore from '../../store/data-store.json';

export default function filterProduct(req, res) {
  try {
    if (req.method === 'POST') {
      const jsonId = JSON.parse(req.body);
      const productId = jsonId.id;

      if (productId) {
        const filteredProduct = DataStore.find(
          (product) => product.id === parseInt(productId)
        );
        res.status(200).json({ ...filteredProduct });
      } else {
        res.status(400).json({ error: 'Bad request.' });
      }
    } else {
      res.status(400).json({ error: 'Bad request' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
