import ListProduct from '@product/vue/Product/ListProduct'
import EditProduct from '@product/vue/Product/EditProduct'
import ProductCategory from '@product/vue/ProductCategory/ListProductCategory'
import EditProductCategory from '@product/vue/ProductCategory/EditProductCategory'
import TypeProduct from '@product/vue/TypeProduct/ListTypeProduct'
import EditTypeProduct from '@product/vue/TypeProduct/EditTypeProduct'
import LineProduct from '@product/vue/LineProduct/ListLineProduct'
import EditLineProduct from '@product/vue/LineProduct/EditLineProduct'
import ListAttributes from '@product/vue/Attribute/ListAttribute'
import EditAttribute from '@product/vue/Attribute/EditAttribute'
import ListAttributeUnit from '@product/vue/AttributeUnit/ListAttributeUnit'
import EditAttributeUnit from '@product/vue/AttributeUnit/EditAttributeUnit'
import ListAttributeGroup from '@product/vue/AttributeGroup/ListAttributeGroup'
import EditAttributeGroup from '@product/vue/AttributeGroup/EditAttributeGroup'
import AttributeBinding from '@product/vue/Attribute/AttributeBinding'
import ListTnved from '@product/vue/Tnved/ListTnved'
import EditTnved from '@product/vue/Tnved/EditTnved'
import ListProducer from '@product/vue/Producer/ListProducer'
import EditProducer from '@product/vue/Producer/EditProducer'
//const EditProducer = () => import('@product/vue/Producer/EditProducer')

export const routes = [
  {
    path: '/',
    name: 'list-product',
    component: ListProduct
  },
  {
    path: '/product/edit/:id',
    name: 'edit-product',
    component: EditProduct,
    props: true
  },
  {
    path: '/attribute/edit/:id',
    name: 'edit-attribute',
    component: EditAttribute,
    props: true
  },
  {
    path: '/binding',
    name: 'attribute-binding',
    component: AttributeBinding
  },
  {
    path: '/product/categories',
    name: 'product-categories-list',
    component: ProductCategory
  },
  {
    path: '/product/categories/edit/:id',
    name: 'edit-product-category',
    component: EditProductCategory,
    props: true
  },
  {
    path: '/product/types',
    name: 'product-types-list',
    component: TypeProduct
  },
  {
    path: '/product/types/edit/:id',
    name: 'edit-product-type',
    component: EditTypeProduct,
    props: true
  },
  {
    path: '/product/lines',
    name: 'product-lines-list',
    component: LineProduct
  },
  {
    path: '/product/lines/edit/:id',
    name: 'edit-line-product',
    component: EditLineProduct,
    props: true
  },
  {
    path: '/product/attributes',
    name: 'product-attributes-list',
    component: ListAttributes
  },
  {
    path: '/product/attributes/edit/:id',
    name: 'edit-attributes-product',
    component: EditAttribute,
    props: true
  },
  {
    path: '/product/attributes-unit',
    name: 'product-attributes-unit-list',
    component: ListAttributeUnit
  },
  {
    path: '/product/attributes-unit/edit/:id',
    name: 'edit-attributes-unit-product',
    component: EditAttributeUnit,
    props: true
  },
  {
    path: '/product/attributes-group',
    name: 'product-attributes-group-list',
    component: ListAttributeGroup
  },
  {
    path: '/product/attributes-group/edit/:id',
    name: 'edit-attributes-group-product',
    component: EditAttributeGroup,
    props: true
  },
  {
    path: '/product/tnved',
    name: 'product-tnved-list',
    component: ListTnved
  },
  {
    path: '/product/tnved/edit/:id',
    name: 'edit-tnved-product',
    component: EditTnved,
    props: true
  },
  {
    path: '/product/producer',
    name: 'product-producer-list',
    component: ListProducer
  },
  {
    path: '/product/producer/edit/:id',
    name: 'edit-producer-product',
    component: EditProducer,
    props: true
  }
];