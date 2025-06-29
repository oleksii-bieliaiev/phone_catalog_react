import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Layout } from '../modules/Layout';
import {
  HomePageLazy,
  ProductPageLazy,
  NotFoundPageLazy,
  ProductDetailsPageLazy,
  ShoppingCartPageLazy,
  FavoritesPageLazy,
} from './pageLoaders';

const PRODUCT_CATEGORIES = ['phones', 'tablets', 'accessories'];

const generateCategoryRoutes = () => {
  return PRODUCT_CATEGORIES.map(category => (
    <Route key={category} path={category}>
      <Route index element={<ProductPageLazy category={category} />} />
      <Route path=":productId" element={<ProductDetailsPageLazy />} />
    </Route>
  ));
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePageLazy />} />

        {generateCategoryRoutes()}

        <Route path="favorites" element={<FavoritesPageLazy />} />
        <Route path="cart" element={<ShoppingCartPageLazy />} />
        <Route path="*" element={<NotFoundPageLazy />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
