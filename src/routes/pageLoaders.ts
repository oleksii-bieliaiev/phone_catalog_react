import { lazy } from 'react';

export const HomePageLazy = lazy(() =>
  import('../modules/HomePage').then(({ HomePage }) => ({ default: HomePage })),
);

export const ProductPageLazy = lazy(() =>
  import('../modules/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);

export const ProductDetailsPageLazy = lazy(() =>
  import('../modules/ProductDetailsPage').then(({ ProductDetailsPage }) => ({
    default: ProductDetailsPage,
  })),
);

export const ShoppingCartPageLazy = lazy(() =>
  import('../modules/ShoppingCartPage').then(({ ShoppingCartPage }) => ({
    default: ShoppingCartPage,
  })),
);

export const FavoritesPageLazy = lazy(() =>
  import('../modules/FavoritesPage').then(({ FavoritesPage }) => ({
    default: FavoritesPage,
  })),
);

export const NotFoundPageLazy = lazy(() =>
  import('../modules/NotFoundPage').then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);
