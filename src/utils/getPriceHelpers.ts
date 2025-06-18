import { ProductData, ProductProjection } from '@commercetools/platform-sdk'

export function getPrice(product: ProductData | ProductProjection): number {
  return product?.masterVariant?.prices?.[0]?.value?.centAmount
    ? product.masterVariant.prices[0].value.centAmount / 100
    : 0
}

export function getDiscountPrice(
  product: ProductData | ProductProjection
): number {
  return product?.masterVariant?.prices?.[0]?.discounted?.value?.centAmount
    ? product.masterVariant.prices[0].discounted.value.centAmount / 100
    : 0
}

export function getDiscountId(
  product: ProductData | ProductProjection
): string | undefined {
  return product?.masterVariant?.prices?.[0]?.discounted?.discount?.id
}
